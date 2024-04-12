import inspect
import os
import threading
import time

import yandexcloud
from django.db.models import Model
from django.forms.models import model_to_dict
from google.protobuf.struct_pb2 import Struct
from google.protobuf.timestamp_pb2 import Timestamp
from yandex.cloud.logging.v1.log_entry_pb2 import (Destination,
                                                   IncomingLogEntry, LogLevel)
from yandex.cloud.logging.v1.log_ingestion_service_pb2 import WriteRequest
from yandex.cloud.logging.v1.log_ingestion_service_pb2_grpc import \
    LogIngestionServiceStub
from yandex.cloud.logging.v1.log_resource_pb2 import LogEntryResource

from project import config


_CLOUD_LOGLEVEL = {
    'LEVEL_UNSPECIFIED': LogLevel.Level.LEVEL_UNSPECIFIED,
    'TRACE': LogLevel.Level.TRACE,
    'DEBUG': LogLevel.Level.DEBUG,
    'INFO': LogLevel.Level.INFO,
    'WARN': LogLevel.Level.WARN,
    'ERROR': LogLevel.Level.ERROR,
    'FATAL': LogLevel.Level.FATAL
}


class Logger(threading.Thread):
    def __init__(self, log_group_id, credentials, name):
        super(Logger, self).__init__()
        self.entries = []
        self.start_time = time.time()
        self.lock = threading.Lock()
        self.running = True
        self.name = name
        self.resource = {"type": str(os.uname()[1]), "id": str(os.getpid())}
        self.group = log_group_id
        self.service = yandexcloud.SDK(**credentials).client(LogIngestionServiceStub)
        self.start()

    def run(self):
        while self.running:
            time_elapsed = time.time() - self.start_time
            with self.lock:
                if len(self.entries) >= 5 or (time_elapsed >= 10 and len(self.entries) > 0):
                    self._process()
                    self.entries = []
                    self.start_time = time.time()
            time.sleep(1)

    def _add_entry(self, entry: dict):
        with self.lock:
            self.entries.append(self._entry(entry))

    def _process(self):
        self.service.Write(WriteRequest(
            destination=Destination(log_group_id=self.group),
            resource=LogEntryResource(**self.resource),
            entries=self.entries
        ))

    def _message(self, args, kwargs, level='LEVEL_UNSPECIFIED'):
        _timestamp = Timestamp()
        _timestamp.GetCurrentTime()
        result = {
            "level": _CLOUD_LOGLEVEL[level],
            "timestamp": _timestamp,
            "json_payload": {}
        }

        stack = inspect.stack()
        caller_func_name = stack[3].function if len(stack) > 3 else None
        func_name = stack[2].function if len(stack) > 2 else None
        file_name = stack[2].filename if len(stack) > 2 else None

        if caller_func_name:
            result["json_payload"]["caller_func_name"] = caller_func_name
        if func_name:
            result["json_payload"]["func_name"] = func_name
        if file_name:
            result["json_payload"]["file_name"] = file_name
        if self.name:
            result["json_payload"]["logger_name"] = self.name

        if len(kwargs.keys()) > 0:
            if "message" in kwargs:
                result["message"] = str(kwargs.pop("message"))
            for k, v in kwargs.items():
                if isinstance(v, Model):
                    kwargs[k] = model_to_dict(v)
                else:
                    try:
                        kwargs[k] = dict(v)
                    except Exception:
                        try:
                            kwargs[k] = str(v)
                        except Exception as e:
                            kwargs[k] = 'ERROR: ' + str(e)
            result["json_payload"].update(kwargs)
        return result

    def debug(self, *args, **kwargs):
        self._add_entry(self._message(args, kwargs, level='DEBUG'))

    def info(self, *args, **kwargs):
        self._add_entry(self._message(args, kwargs, level='INFO'))

    def error(self, *args, **kwargs):
        self._add_entry(self._message(args, kwargs, level="ERROR"))

    @staticmethod
    def _entry(value: dict):
        payload = Struct()
        try:
            payload.update(value["json_payload"])
        except Exception:
            pass
        else:
            value["json_payload"] = payload
        return IncomingLogEntry(**value)


def get_logger(name):
    return Logger(
        log_group_id=config.LOG_GROUP_ID,
        credentials={"token": config.KEY_YANDEX},
        name=name,
    )
