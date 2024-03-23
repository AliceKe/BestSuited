from index import documents, compute_cosine_scores


def select_similar_k_docs(doc_scores_map, k):
    res = []

    for doc, _ in doc_scores_map:
        res.append(documents[doc])

        if k == 0:
            break

    return res


def get_postings_regular_input(text, k=50):
    cosine_scores = compute_cosine_scores(text)
    return select_similar_k_docs(cosine_scores, k)
