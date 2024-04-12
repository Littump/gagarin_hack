import os

from reducers.base import BaseReducer


class PathReducer(metaclass=BaseReducer):

    @staticmethod
    def get_path():
        return os.path.dirname(os.path.abspath(__file__))
