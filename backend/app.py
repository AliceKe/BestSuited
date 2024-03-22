import os
from flask import Flask
from flask_cors import CORS
from api import bp
from settings import settings
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from index import (
    compute_cosine_scores,
    tokenize_docs,
    extract_tokens_from_docs,
    construct_invertex_index,
    construct_docs_norms,
    construct_idf_map,
)

app = Flask(__name__)
CORS(app)

app.register_blueprint(bp)


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
docs_norms = construct_docs_norms(inverted_index, tfidf_matrix, len(documents))

cosine_scores = compute_cosine_scores("query", inverted_index, docs_norms, idf_map)

if "DB_NAME" not in os.environ:
    app.run(debug=True, host="0.0.0.0", port=5001)
