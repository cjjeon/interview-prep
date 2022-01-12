import random
import string
from pathlib import Path

from werkzeug.datastructures import FileStorage


def create_folder_if_not_exist(folder_path: str):
    Path(folder_path).mkdir(parents=True, exist_ok=True)


def save_file(file: FileStorage, folder_path: str, file_name: str):
    create_folder_if_not_exist(folder_path)
    file.save(f"{folder_path}/{file_name}")


def create_random_file_name(length: int = 10) -> str:
    characters = string.ascii_lowercase + string.digits + string.ascii_uppercase
    return ''.join(random.sample(characters, length))
