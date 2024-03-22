from index import compute_cosine_scores


def get_postings_regular_input(text):
    cosine_scores = compute_cosine_scores(text)
    return cosine_scores
