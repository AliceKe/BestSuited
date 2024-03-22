import os
import json

os.environ["ROOT_PATH"] = os.path.abspath(os.path.join("..", os.curdir))


class Settings:
    current_directory: str = os.path.dirname(os.path.abspath(__file__))
    data_file_path = os.path.join(current_directory, "data/data.json")


settings = Settings()
