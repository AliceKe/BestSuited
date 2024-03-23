import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from services import get_postings_regular_input

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


# @app.get("/regular")
# def regular_text_search():
#     text = request.args.get("q")
#     res = get_postings_regular_input(text)

#     filter_by = request.args.get("filter")
#     sort_by = request.args.get("sort")

#     return {"postings": res if input else ["Hello"]}


if "DB_NAME" not in os.environ:
    app.run(debug=True, host="0.0.0.0", port=5000)
