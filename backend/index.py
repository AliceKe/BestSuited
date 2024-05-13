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
    print(feature_names)
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


def compute_cosine_scores(query):
    query_tfidf = vectorizer.transform([query]).toarray()
    query_vec = normalize(np.dot(query_tfidf, words_compressed)).squeeze()
    sims = docs_compressed_normed.dot(query_vec)
    asort = np.argsort(-sims)[:200]

    n_components = 5
    asort = np.argsort(-sims)[:n_components]
    words = vectorizer.get_feature_names_out()

    result = [words[i] for i in asort]
    result_scores = [sims[i] for i in asort]

    return [(i, sims[i]) for i in asort[1:]], (result, result_scores)


def closest_projects_to_word(word_in, k=5):
    if word_in not in word_to_index:
        return []
    sims = docs_compressed_normed.dot(
        words_compressed_normed[word_to_index[word_in], :]
    )
    asort = np.argsort(-sims)[: k + 1]
    return [(i, documents[i][0], sims[i]) for i in asort[1:]]


# Load data and prepare TF-IDF and SVD
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
