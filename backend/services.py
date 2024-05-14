from index import documents, compute_cosine_scores, extract_tokens_from_file_input


# def sort_by(data: dict, param: SortParam = "alphabetical", isDecreasingOrder=True):
#     res = {}

#     if param == "rating":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(), key=lambda x: x[1]["rating"], reverse=isDecreasingOrder
#             )
#         }
#     elif param == "workhappiness":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Work Happiness Score"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "learning":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Learning"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "appreciation":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Appreciation"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "purpose":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Purpose"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "flexibility":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Flexibility"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "achievement":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Achievement"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "inclusion":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Inclusion"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "support":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Support"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "energy":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Energy"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "trust":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Trust"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "compensation":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Compensation"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "belonging":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Belonging"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     elif param == "management":
#         res = {
#             k: v
#             for k, v in sorted(
#                 data.items(),
#                 key=lambda x: json.loads(x[1]["happiness"].replace("'", '"')).get(
#                     "Management"
#                 ),
#                 reverse=isDecreasingOrder,
#             )
#         }
#     else:
#         res = {k: v for k, v in sorted(data.items())}
#     return res


def group_postings_by_company(postings):
    groups = {}

    for p in postings:
        company = p["company"]

        if company in groups:
            groups[company]["postings"].append(p)
        else:
            groups[company] = {
                "name": company,
                "description": p["description"],
                "rating": p["rating"],
                "happiness": p["happiness"],
                "postings": [p],
            }

    return groups


def select_similar_k_docs(doc_scores_map, graph_data, k=25):
    res = []
    graph_res = []

    for doc, score in doc_scores_map:
        document = documents[doc]
        document["score"] = score
        res.append(document)

        graph_res.append(graph_data[doc])

        if k == 0:
            break

    return res, graph_res


def get_postings_regular_input(text, k=25):
    cosine_scores, graph_data = compute_cosine_scores(text)
    # return select_similar_k_docs(cosine_scores, graph_data, k)
    selected_docs, selected_graph_data = select_similar_k_docs(
        cosine_scores, graph_data, k
    )
    return selected_docs, selected_graph_data


def get_postings_file_input(file, k=25):
    file_tokens = extract_tokens_from_file_input(file)
    cosine_scores, graph_data = compute_cosine_scores(" ".join(file_tokens))
    # return select_similar_k_docs(cosine_scores, graph_data, k)
    selected_docs, selected_graph_data = select_similar_k_docs(
        cosine_scores, graph_data, k
    )
    return selected_docs, selected_graph_data
