import numpy as np
import json
import re
from settings import settings
from collections import defaultdict, Counter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
import PyPDF2


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
    return remove_punctuation(' '.join(attrs).lower())

def tokenize_docs(doc):
    return doc.split()

def construct_invertex_index(vectorizer, tfidf_matrix, n_components):
    feature_names = vectorizer.get_feature_names_out()
    print(feature_names)
    terms_indices = {term: idx for idx, term in enumerate(feature_names) if idx < n_components}
    inverted_index = defaultdict(list)
    rows, cols = tfidf_matrix.nonzero()
    for row, col in zip(rows, cols):
        #if col < n_components:  # Only include columns within the reduced dimensions
            inverted_index[feature_names[col]].append((row, tfidf_matrix[row, col]))
    return terms_indices, inverted_index

def construct_term_idf_map(vectorizer):
    return dict(zip(vectorizer.get_feature_names_out(), vectorizer.idf_))

def construct_query_tfidf(query, idf_map):
    tokens = Counter(extract_tokens_from_regular_input(query))
    return {term: freq * idf_map.get(term, 0) for term, freq in tokens.items() if term in idf_map}

def compute_cosine_scores(query):
    print("BABYGURL ", query)
    query_tfidf = construct_query_tfidf(query, idf_map)
    print(query_tfidf)
    query_norm = np.sqrt(sum(value ** 2 for value in query_tfidf.values()))
    doc_scores = defaultdict(float)
    for term, qtfidf in query_tfidf.items():
        term_idx = terms_index.get(term)
        print(terms_index)
        print(term_idx)
        print(term)
        if term_idx is not None:  # Check term is in the reduced matrix
            for i in range(len(documents)):
                doc_scores[i] += reduced_tfidf_matrix[i, term_idx] * qtfidf
    scores = [(doc_id, score / (np.linalg.norm(reduced_tfidf_matrix[doc_id]) * query_norm)) for doc_id, score in doc_scores.items()]
    return sorted(scores, key=lambda x: x[1], reverse=True)

# Load data and prepare TF-IDF and SVD
with open(settings.data_file_path, 'r') as file:
    data = json.load(file)
documents = data.get("job_postings")

vectorizer = TfidfVectorizer(tokenizer=tokenize_docs)
tfidf_matrix = vectorizer.fit_transform([extract_tokens_from_docs(doc) for doc in documents])
n_components = min(100, tfidf_matrix.shape[1])
svd = TruncatedSVD(n_components=n_components)
reduced_tfidf_matrix = svd.fit_transform(tfidf_matrix)
print(reduced_tfidf_matrix)

terms_index, inverted_index = construct_invertex_index(vectorizer, reduced_tfidf_matrix, n_components)
idf_map = construct_term_idf_map(vectorizer)

