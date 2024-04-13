import os

from dotenv import load_dotenv


load_dotenv()

KEY_YANDEX = os.getenv("KEY_YANDEX")
LOG_GROUP_ID = os.getenv("LOG_GROUP_ID")
OLLAMA_URL = os.getenv("OLLAMA_URL")
