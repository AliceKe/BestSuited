from typing import List
from sklearn.feature_extraction.text import TfidfVectorizer

def build_vectorizer(max_features, stop_words, max_df=0.8, min_df=10, norm='l2'):
    """
    From A4
    """
    # term frequency
    return TfidfVectorizer(max_features=max_features, stop_words=stop_words, max_df = max_df, min_df=min_df, norm = norm)

def build_inverted_index(vocab: List) -> dict:
   inverted_index = {}

   # for i in range(len(vocab)):

   return inverted_index

def compute_idf():
   return None 

def cosine_similarity():
   return None

def build_vectorizer():
   return None 

def build_sims_cos():
   return None
      
def top_n_results(n:int):
   return None