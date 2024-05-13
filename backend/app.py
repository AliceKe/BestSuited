import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from services import get_postings_file_input, get_postings_regular_input
from svdGraph import create_spider_plot

app = Flask(__name__)
CORS(app)


@app.get("/")
def home():
    return "Hi"


@app.get("/regular")
def regular_text_search():
    text = request.args.get("q")
    res = get_postings_regular_input(text)
    return jsonify({"postings": res})


@app.post("/resume")
def resume_search():
    uploaded_file = request.files["resume"]
    res = get_postings_file_input(uploaded_file)
    return jsonify({"postings": res, "graph_data": []})


if "DB_NAME" not in os.environ:
    app.run(debug=True, host="0.0.0.0", port=5000)
