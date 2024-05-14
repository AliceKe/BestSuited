import numpy as np
import json
import re
from settings import settings
from collections import defaultdict, Counter
from sklearn.feature_extraction.text import TfidfVectorizer
import PyPDF2
from scipy.sparse.linalg import svds
from sklearn.preprocessing import normalize


def remove_punctuation(text):
    punctuation_pattern = r"[^\w\s]"
    return re.sub(punctuation_pattern, "", text)


def extract_tokens_from_regular_input(query):
    return remove_punctuation(query.lower()).strip().split()


def extract_tokens_from_file_input(file):
    pdf_read = PyPDF2.PdfReader(file)
    resume_text = ""
    for page in pdf_read.pages:
        resume_text += page.extract_text() or ""
    return extract_tokens_from_regular_input(remove_punctuation(resume_text))


def extract_tokens_from_docs(doc):
    attrs = [doc["company"], doc["role"], doc["country"], doc["city"], doc["skills"]]
    return remove_punctuation(" ".join(attrs).lower())


def tokenize_docs(doc):
    return doc.split()


def construct_invertex_index(vectorizer, tfidf_matrix, n_components):
    feature_names = vectorizer.get_feature_names_out()
    terms_indices = {
        term: idx for idx, term in enumerate(feature_names) if idx < n_components
    }
    inverted_index = defaultdict(list)
    rows, cols = tfidf_matrix.nonzero()
    for row, col in zip(rows, cols):
        # if col < n_components:  # Only include columns within the reduced dimensions
        inverted_index[feature_names[col]].append((row, tfidf_matrix[row, col]))
    return terms_indices, inverted_index


def construct_term_idf_map(vectorizer):
    return dict(zip(vectorizer.get_feature_names_out(), vectorizer.idf_))


def construct_query_tfidf(query, idf_map):
    tokens = Counter(extract_tokens_from_regular_input(query))
    return {
        term: freq * idf_map.get(term, 0)
        for term, freq in tokens.items()
        if term in idf_map
    }


def compute_cosine_scores(query, k):
    query_tfidf = vectorizer.transform([query]).toarray()
    query_vec = normalize(np.dot(query_tfidf, words_compressed)).squeeze()
    sims = docs_compressed_normed.dot(query_vec)
    asort = np.argsort(-sims)[:k]
    prominent_words = most_prominent_features(sims, query_vec, query_tfidf)
    return [(i, sims[i]) for i in asort[1:]], prominent_words


def closest_projects_to_word(word_in, k=5):
    if word_in not in word_to_index:
        return []
    sims = docs_compressed_normed.dot(
        words_compressed_normed[word_to_index[word_in], :]
    )
    asort = np.argsort(-sims)[: k + 1]
    return [(i, documents[i][0], sims[i]) for i in asort[1:]]


def most_prominent_features(sims, query_vec, query_tfidf, k=5):
    def repeat_vector(vector, length):
        vector = np.array(vector).reshape(1, -1)
        repeated_array = np.tile(vector, (length, 1))
        return repeated_array

    def compute_word_contribution():
        # sims = docs_compressed_normed.dot(query_vec)
        p = 10

        asort = np.argsort(-sims)[:p]
        result = [most_sim_words[i] for i in asort][1:]
        result_scores = [sim_scores[i] for i in asort][1:]

        sums = np.sum(np.abs(result_scores), axis=1)
        percentages = (result_scores / sums[:, np.newaxis]) * 100

        percentages = percentages[:, :k].tolist()
        return {"words": result[0], "values": percentages[0][:5]}

    words = vectorizer.get_feature_names_out()
    most_sim_words = []
    sim_scores = []
    length = len(docs_compressed_normed)
    repeated_query_vec = repeat_vector(query_vec, length)

    words_sims = docs_compressed_normed * repeated_query_vec

    largest_indices = np.argsort(-words_sims, axis=1)[:, 0:100]
    largest_values = np.sort(-words_sims, axis=1)[:, 0:100]

    max_indices = np.argmax(
        np.expand_dims(query_tfidf.squeeze(), axis=-1) * words_compressed_normed, axis=0
    )

    word_representations = []
    for i in max_indices:
        word_representations.append(words[i])

    n, m = largest_indices.shape
    for i in range(n):
        contribution_per_index = {word: 0 for word in word_representations}
        for j in range(m):
            contribution_per_index[word_representations[largest_indices[i, j]]] -= (
                largest_values[i, j]
            )

        top_k_words = sorted(
            contribution_per_index, key=contribution_per_index.get, reverse=True
        )[:k]

        sorted_values = sorted(contribution_per_index.values(), reverse=True)

        most_sim_words.append(top_k_words)
        sim_scores.append(sorted_values)

    return compute_word_contribution()


with open(settings.data_file_path, "r") as file:
    data = json.load(file)
documents = data.get("job_postings")

vectorizer = TfidfVectorizer(tokenizer=tokenize_docs, stop_words="english")

td_matrix = vectorizer.fit_transform(
    [extract_tokens_from_docs(doc) for doc in documents]
)

docs_compressed, s, words_compressed = svds(td_matrix, k=300)
words_compressed = words_compressed.transpose()

word_to_index = vectorizer.vocabulary_
index_to_word = {i: t for t, i in word_to_index.items()}

words_compressed_normed = normalize(words_compressed, axis=1)

td_matrix_np = td_matrix.transpose().toarray()
td_matrix_np = normalize(td_matrix_np)

docs_compressed_normed = normalize(docs_compressed)
