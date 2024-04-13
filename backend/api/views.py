from api.filters import EventFilter
from api.models import (Achievement, Event, PointUp, Question,
                        Service, Test, UserTest)
from api.serializers import (AchievementSerializer, EventSerializer,
                             PointUpSerializer, QuestionSerializer,
                             ServiceSerializer, TestSerializer,
                             UserTestSerializer)
from django_filters.rest_framework import DjangoFilterBackend
from project.logger import get_logger
from reducers.event_reducer import EventReducer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class EventViewSet(ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    event_reducer = EventReducer()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = EventFilter
    logger = get_logger('EventViewSet')

    def list(self, request):
        queryset = Event.objects.all()
        for event in queryset:
            event.description = (self.event_reducer
                                 .short_description(event.description))
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)


class AchievementViewSet(ModelViewSet):
    serializer_class = AchievementSerializer
    queryset = Achievement.objects.all()
    logger = get_logger('AchievementViewSet')


class PointUpViewSet(ModelViewSet):
    serializer_class = PointUpSerializer
    queryset = PointUp.objects.all()
    logger = get_logger('PointUpViewSet')


class ServiceViewSet(ModelViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
    logger = get_logger('ServiceViewSet')


class QuestionViewSet(ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    logger = get_logger('QuestionViewSet')


class TestViewSet(ModelViewSet):
    serializer_class = TestSerializer
    queryset = Test.objects.all()
    logger = get_logger('TestViewSet')


class UserTestViewSet(ModelViewSet):
    serializer_class = UserTestSerializer
    queryset = UserTest.objects.all()
    logger = get_logger('UserTestViewSet')
