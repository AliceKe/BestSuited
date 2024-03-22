from flask import Blueprint, request
from utils import json_search


bp = Blueprint("api", "bp")


@bp.route("/")
def home():
    return "Hi"


@bp.route("/jobs")
def regular_text_search():
    text = request.args.get("q")
    res = json_search(text)
    return {"postings": res}
