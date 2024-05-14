import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from services import get_postings_file_input, get_postings_regular_input
import uuid

app = Flask(__name__)
CORS(app)

uploaded_data = {}


@app.get("/")
def home():
    return "Hi"


@app.get("/regular")
def regular_text_search():
    text = request.args.get("q")
    res, graph_info = get_postings_regular_input(text)
    return jsonify({"postings": res, "graph_data": graph_info})


@app.post("/resume")
def resume_search():
    uploaded_file = request.files["resume"]
    res, graph_info = get_postings_file_input(uploaded_file)
    file_id = str(uuid.uuid4())
    uploaded_data[file_id] = graph_info
    return jsonify({"postings": res, "graph_data": graph_info})


@app.get("/resume")
def get_graph_data():
    file_id = request.args.get("file_id")
    if file_id and file_id in uploaded_data:
        graph_info = uploaded_data[file_id]
        return jsonify({"graph_data": graph_info})
    else:
        return jsonify({"error": "Graph data not found for given file_id"}), 404


if "DB_NAME" not in os.environ:
    app.run(debug=True, host="0.0.0.0", port=5000)
