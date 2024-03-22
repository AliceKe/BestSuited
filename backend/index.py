from collections import defaultdict


def extract_tokens_from_regular_input(query):
    def decode(query) -> str:
        return query.strip()

    return decode(query)


def extract_tokens_from_form_input(query):
    def decode(query) -> str:
        return query.strip()

    return decode(query)


def extract_tokens_from_docs(doc):
    def encode(strs) -> str:
        ans = []
        for s in strs:
            s = s.strip()
            ans.append("{:4}".format(len(s)) + s)
        return "".join(ans)

    res = (
        encode([doc["company"], doc["role"], doc["country"], doc["city"]])
        + " "
        + doc["skills"]
        + doc["company"]
        + doc["role"]
        + doc["country"]
        + doc["city"]
    )

    return res


def custom_tokenizer(text):
    def decode(s: str):
        res = []
        i, n = 0, len(s)
        while i < n:
            try:
                size = int(s[i : i + 4])
                i += 4
                res.append(s[i : i + size])
                i += size
            except Exception:
                break

        res.extend(s[i:].split())
        return res

    return decode(text)


def construct_invertex_index(vectorizer, tfidf_matrix):
    terms_indices = {
        term: idx for idx, term in enumerate(vectorizer.get_feature_names_out())
    }

    inverted_index = defaultdict(list)

    rows, cols = tfidf_matrix.nonzero()
    for row, col in zip(rows, cols):
        val = tfidf_matrix[row, col]
        term = terms_indices.get(col)
        if term is not None:
            inverted_index[row].append((term, val))

    return terms_indices, inverted_index
