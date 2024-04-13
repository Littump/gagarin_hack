import pandas as pd
import numpy as np
import torch
from sentence_transformers import SentenceTransformer
from sentence_transformers import util


class RecommendationModel:
    """"
        recsys = ReccomendationModel()
        posts_df = pd.read_csv("posts.csv")
        embeddings = recsys.get_embeddings_from_posts(posts_df)
        text = "какой-то текст из достижений юзера..."
        recsys.similarity_search(text, embeddings) # top-k posts
    """
    def __init__(self, model_name: str = 'hivaze/ru-e5-large'):
        self.model = SentenceTransformer(model_name)
        self.model.eval()

    def _get_embedding(self, text: str):
        return self.model.encode(text, normalize_embeddings=True)

    def get_embeddings_from_posts(self, posts: pd.DataFrame):
        posts["fulltext"] = posts["name"] + posts["description"]

        embeddings = []
        for text in posts["fulltext"]:
            emb = self._get_embedding(text)
            embeddings.append(emb)

        return embeddings

    def similarity_search(self, user_text: str, embeddings: list):
        embeddings = torch.tensor(np.array(embeddings).astype("float32"))
        user_emb = self.model.encode(user_text, normalize_embeddings=True)
        cos_sims = util.pytorch_cos_sim(embeddings, user_emb).tolist()
        posts = {}
        for i in range(len(cos_sims)):
            posts[i + 1] = cos_sims[i]

        k = 10
        topk_posts = sorted(posts.items(), key=lambda x: x[1], reverse=True)[:k]
        return topk_posts
