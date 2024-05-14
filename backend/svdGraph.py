import numpy as np
import re
import PyPDF2
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse.linalg import svds
from sklearn.preprocessing import normalize
from collections import defaultdict, Counter
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px


def remove_punctuation(text):
    punctuation_pattern = r"[^\\w\\s]"
    return re.sub(punctuation_pattern, "", text)


def extract_tokens_from_regular_input(query):
    return remove_punctuation(query.lower()).strip().split()


def extract_tokens_from_file_input(file):
    pdf_read = PyPDF2.PdfReader(file)
    resume_text = ""
    for page in pdf_read.pages:
        resume_text += page.extract_text() or ""
    return extract_tokens_from_regular_input(remove_punctuation(resume_text))


def construct_invertex_index(vectorizer, tfidf_matrix, n_components):
    feature_names = vectorizer.get_feature_names_out()
    terms_indices = {
        term: idx for idx, term in enumerate(feature_names) if idx < n_components
    }
    inverted_index = defaultdict(list)
    rows, cols = tfidf_matrix.nonzero()
    for row, col in zip(rows, cols):
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


def create_spider_plot(file_path, query):
    tokens = extract_tokens_from_file_input(file_path)

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(tokens)

    n_components = 5
    terms_indices, inverted_index = construct_invertex_index(
        vectorizer, tfidf_matrix, n_components
    )
    idf_map = construct_term_idf_map(vectorizer)

    query_tfidf = construct_query_tfidf(query, idf_map)

    data = {"word": list(query_tfidf.keys()), "percent": list(query_tfidf.values())}

    # fig = go.Figure()
    # fig.add_trace(
    #     go.Scatterpolar(
    #         r=data["percent"],
    #         theta=data["word"],
    #         fill="toself",
    #         fillcolor="lightgreen",
    #         name="Contribution Percentages",
    #     )
    # )
    # fig.update_layout(title="Contribution Percentages of Top Words in Your Resume")
    return data
