import os
from flask import Flask
from flask_cors import CORS
from api import bp
from settings import settings
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from index import custom_tokenizer, extract_tokens_from_docs, construct_invertex_index

app = Flask(__name__)
CORS(app)

app.register_blueprint(bp)


# Data loading
with open(settings.data_file_path, "r") as file:
    data = json.load(file)

documents = data.get("job_postings")

# TF-IDF matrix
vectorizer = TfidfVectorizer(tokenizer=custom_tokenizer)

tfidf_matrix = vectorizer.fit_transform(map(extract_tokens_from_docs, documents))
inverted_index = construct_invertex_index(vectorizer, tfidf_matrix)

# Inverted index
terms_index, inverted_index = construct_invertex_index(vectorizer, tfidf_matrix)

# print(
#     f"TF-IDF Matrix\n{tfidf_matrix} \n\nInverted Index\n{inverted_index} \
#         \n\nTerms Index\n{terms_index}"
# )

print(f"TF-IDF Matrix\n{tfidf_matrix} \n\nInverted Index\n{inverted_index}")

if "DB_NAME" not in os.environ:
    app.run(debug=True, host="0.0.0.0", port=5001)
