from reducers.base import BaseReducer
from project.logger import get_logger


class EventReducer(metaclass=BaseReducer):
    def __init__(self):
        self.logger = get_logger('EventReducer')

    def short_description(self, description):
        if len(description) > 100:
            return description[:100].strip() + "..."
        else:
            return description
