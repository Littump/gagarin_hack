from reducers.base import BaseReducer
from project.logger import get_logger
import numpy as np
import torch
from sentence_transformers import SentenceTransformer
from sentence_transformers import util


class ModelReducer(metaclass=BaseReducer):
    """"
        recsys = ReccomendationModel()
        posts_df = pd.read_csv("posts.csv")
        embeddings = recsys.get_embeddings_from_posts(posts_df)
        text = "какой-то текст из достижений юзера..."
        recsys.similarity_search(text, embeddings) # top-k posts
    """
    def __init__(self, model_name: str = 'hivaze/ru-e5-large'):
        self.logger = get_logger('ModelReducer')
        self.model = SentenceTransformer(model_name)
        self.model.eval()

    def get_embedding(self, text: str):
        return self.model.encode(text, normalize_embeddings=True)

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
