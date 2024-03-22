from flask import Blueprint
from utils import json_search


bp = Blueprint()


@bp.route("/")
def home():
    return "Hi"


@bp.route("/episodes")
def episodes_search(text, sort_param, sort_dir):
    # text = request.args.get("title")
    # sort_param = request.args.get("filter_opts")
    # sort_dir = request.args.get("sortingDir")
    # print(sort_dir)
    # print("SORTED DATA")
    # print(sorted_data, sort_param)
    return json_search(text, sort_param, sort_dir)
