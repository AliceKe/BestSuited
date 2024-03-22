from flask import Blueprint, request
from utils import json_search


bp = Blueprint("api", "bp")


@bp.route("/")
def home():
    return "Hi"


@bp.route("/jobs")
def episodes_search():
    # text = request.args.get("title")
    # sort_param = request.args.get("filter_opts")
    # sort_dir = request.args.get("sortingDir")
    # print(sort_dir)
    # print("SORTED DATA")
    # print(sorted_data, sort_param)

    text = request.args.get('q')
    res = json_search(text)
    return {"postings" : res}
