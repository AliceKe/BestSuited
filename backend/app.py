import json
import os
from flask import Flask, render_template, request
from flask_cors import CORS
from helpers.MySQLDatabaseHandler import MySQLDatabaseHandler
import pandas as pd

os.environ["ROOT_PATH"] = os.path.abspath(os.path.join("..", os.curdir))

current_directory = os.path.dirname(os.path.abspath(__file__))

json_file_path = os.path.join(current_directory, "data/data.json")

with open(json_file_path, "r") as file:
    data = json.load(file)

job_postings = data.get("job_postings")

app = Flask(__name__)
CORS(app)


# Sample search using json with pandas
def json_search(query): ...


@app.route("/")
def home():
    return render_template("base.html", title="sample html")


@app.route("/episodes")
def episodes_search():
    text = request.args.get("title")
    return json_search(text)


if "DB_NAME" not in os.environ:
    app.run(debug=True, host="0.0.0.0", port=5001)
