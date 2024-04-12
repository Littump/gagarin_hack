from reducers.base import BaseReducer
from project.logger import get_logger


class ModelReducer(metaclass=BaseReducer):
    def __init__(self):
        self.logger = get_logger('ModelReducer')
        ...

    ...
