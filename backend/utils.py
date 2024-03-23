import json
from enum import Enum


class SortParam(Enum):
    alphabetical: str
    rating: str
    workhappiness: str
    learning: str
    appreciation: str
    purpose: str
    flexibility: str
    achievement: str
    inclusion: str
    support: str
    energy: str
    trust: str
    compensation: str
    belonging: str
    management: str


# def select_similar_docs(query, sorting_by="alphabetical", sorting_dir="desc"):
#     sorting_bool = sorting_dir == "desc"
#     sorted_data = sort_by(outputs, sorting_by, sorting_bool)
#     if query is None:
#         sorted_data = outputs

#     return sorted_data
