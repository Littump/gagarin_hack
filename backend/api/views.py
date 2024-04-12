from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

from api.serializers import EventSerializer, AchievementSerializer, PointUpSerializer, ServiceSerializer
from api.models import Event, Achievement, PointUp, Service
from reducers.event_reducer import EventReducer
from project.logger import get_logger
from api.filters import EventFilter


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
