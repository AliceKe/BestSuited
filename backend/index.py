import numpy as np
from collections import defaultdict, Counter
from settings import settings
import json
from sklearn.feature_extraction.text import TfidfVectorizer
import re
import PyPDF2


def remove_punctuation(text):
    punctuation_pattern = r"[^\w\s]"
    cleaned_text = re.sub(punctuation_pattern, "", text)
    return cleaned_text


def extract_tokens_from_regular_input(query):
    def decode(query) -> str:
        return query.strip().split()

    res = decode(remove_punctuation(query.lower()))
    return res


def extract_tokens_from_file_input(file):
    def parse_pdf_resume(file):
        pdf_read = PyPDF2.PdfReader(file)
        resume_text = ""

        for page_num in range(len(pdf_read.pages)):
            page = pdf_read.pages[page_num]
            page_text = page.extract_text()

            resume_text += page_text

        return resume_text

    resume_text = parse_pdf_resume(file)
    return extract_tokens_from_regular_input(resume_text)


def extract_tokens_from_docs(doc):
    def encode(strs) -> str:
        ans = []
        for s in strs:
            s = s.strip().lower()
            ans.append("{:4}".format(len(s)) + s)
        return "".join(ans)

    res = (
        encode([doc["company"], doc["role"], doc["country"], doc["city"]])
        + " "
        + doc["skills"]
        + " "
        + doc["company"]
        + " "
        + doc["role"]
        + " "
        + doc["country"]
        + " "
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
    # Get the feature names and their corresponding indices
    feature_names = vectorizer.get_feature_names_out()
    terms_indices = {term: idx for idx, term in enumerate(feature_names)}

    inverted_index = defaultdict(list)

    rows, cols = tfidf_matrix.nonzero()
    for row, col in zip(rows, cols):
        val = tfidf_matrix[row, col]
        term = feature_names[row]
        inverted_index[term].append((col, val))

    return terms_indices, inverted_index


def construct_docs_norms(inverted_index, n_docs):
    norms = np.zeros(n_docs)

    for _, posting_list in inverted_index.items():
        for doc_id, tfidf in posting_list:
            norms[doc_id] += tfidf**2

    return np.sqrt(norms)


def construct_term_idf_map(vectorizer):
    return {
        term: idf
        for term, idf in zip(vectorizer.get_feature_names_out(), vectorizer.idf_)
    }


def construct_query_tfidf(query, idf_map):
    query = query.strip().lower()
    res = Counter(extract_tokens_from_regular_input(query))

    for term in query.split():
        res[term] *= idf_map.get(term, 0)

    return res


def compute_cosine_scores(query):
    def get_dot_scores():
        res = defaultdict(int)

        for term, qtfidf in query_tfidf.items():
            if qtfidf != 0 and term in inverted_index:
                for doc, dtfidf in inverted_index[term]:
                    res[doc] += dtfidf * query_tfidf[term]

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

    scores = normalize_scores()
    return sorted(scores, key=lambda x: x[1], reverse=True)


# Data loading
with open(settings.data_file_path, "r") as file:
    data = json.load(file)

documents = data.get("job_postings")


# TF-IDF
vectorizer = TfidfVectorizer(tokenizer=tokenize_docs)
tfidf_matrix = vectorizer.fit_transform(map(extract_tokens_from_docs, documents)).T

idf_map = construct_term_idf_map(vectorizer)
feature_names = vectorizer.get_feature_names_out()

# Inverted index
terms_index, inverted_index = construct_invertex_index(vectorizer, tfidf_matrix)
