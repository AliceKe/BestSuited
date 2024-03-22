import numpy as np
from collections import defaultdict, Counter
from settings import settings
import json
from sklearn.feature_extraction.text import TfidfVectorizer


def extract_tokens_from_regular_input(query):
    def decode(query) -> str:
        return query.strip()

    return decode(query)


def extract_tokens_from_form_input(query): ...


def extract_tokens_from_docs(doc):
    def encode(strs) -> str:
        ans = []
        for s in strs:
            s = s.strip()
            ans.append("{:4}".format(len(s)) + s)
        return "".join(ans)

    res = (
        encode([doc["company"], doc["role"], doc["country"], doc["city"]])
        + " "
        + doc["skills"]
        + doc["company"]
        + doc["role"]
        + doc["country"]
        + doc["city"]
    )

    return res


def tokenize_docs(doc):
    def decode(s: str):
        res = []
        i, n = 0, len(s)
        while i < n:
            try:
                size = int(s[i : i + 4])
                i += 4
                res.append(s[i : i + size])
                i += size
            except Exception:
                break

        res.extend(s[i:].split())
        return res

    return decode(doc)


def construct_invertex_index(vectorizer, tfidf_matrix):
    terms_indices = {
        term: idx for idx, term in enumerate(vectorizer.get_feature_names_out())
    }

    inverted_index = defaultdict(list)

    rows, cols = tfidf_matrix.nonzero()
    for row, col in zip(rows, cols):
        val = tfidf_matrix[row, col]
        term = terms_indices.get(col)
        if term is not None:
            inverted_index[row].append((term, val))

    return terms_indices, inverted_index


def construct_docs_norms(inverted_index, n_docs):
    norms = np.zeros(n_docs)

    for _, posting_list in inverted_index.items():
        for doc_id, tfidf in posting_list:
            norms[doc_id] += tfidf**2

    return np.sqrt(norms)


def construct_idf_map(vectorizer_idf, tfidf_matrix):
    return {}


def construct_query_tfidf(query, idf_map):
    res = Counter(query.split())

    for term in res:
        res[term] *= idf_map.get(term, 0)

    return res


def compute_cosine_scores(query):
    def get_dot_scores():
        res = defaultdict(int)

        for term, qtfidf in query_tfidf.items():
            if qtfidf != 0:
                for doc, dtfidf in inverted_index:
                    doc_scores[doc] += dtfidf * query_tfidf[term]
        return res

    def normalize_scores():
        res = []

        for doc_id, score in doc_scores.items():
            if score > 0:
                norm_score = score / (docs_norms[doc_id] * query_norm)
                res.append((doc_id, norm_score))
            else:
                res.append((doc_id, 0))

        return res

    query_tfidf = construct_query_tfidf(query, idf_map)
    query_norm = np.sqrt(np.sum([v**2 for v in query_tfidf.values()]))

    doc_scores = get_dot_scores()
    docs_norms = construct_docs_norms(inverted_index, len(documents))

    return sorted(normalize_scores(), key=lambda x: x[1], reverse=True)


# Data loading
with open(settings.data_file_path, "r") as file:
    data = json.load(file)

documents = data.get("job_postings")

# TF-IDF matrix
vectorizer = TfidfVectorizer(tokenizer=tokenize_docs)

tfidf_matrix = vectorizer.fit_transform(map(extract_tokens_from_docs, documents))
idf_map = construct_idf_map(vectorizer.idf_, tfidf_matrix)

# Inverted index
terms_index, inverted_index = construct_invertex_index(vectorizer, tfidf_matrix)
