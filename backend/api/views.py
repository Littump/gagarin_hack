import json

from api.filters import EventFilter
from api.models import (Achievement, Event, PointUp, Question, Service, Test,
                        UserTest, VariantQuestion)
from api.serializers import (AchievementSerializer, EventSerializer,
                             PointUpSerializer, QAQustionSerializer,
                             QuestionSerializer, ServiceSerializer,
                             TestSerializer, UserTestSerializer,
                             VariantQuestionSerializer)
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from project.logger import get_logger
from reducers.chatbot_reducer import ChatBotReducer
from reducers.event_reducer import EventReducer
from reducers.model_reducer import ModelReducer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet


class EventViewSet(ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    event_reducer = EventReducer()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = EventFilter
    model_reducer = ModelReducer()
    logger = get_logger('EventViewSet')

    def list(self, request):
        queryset = Event.objects.all()
        for event in queryset:
            event.description = (self.event_reducer
                                 .short_description(event.description))
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def priority_list(self, request):
        user = request.user
        achievements = user.achievements.all()
        if not achievements:
            return self.list(request)
        text_achievements = ' '.join([ach.name + ' ' + ach.description
                                      for ach in achievements])
        events = Event.objects.all().order_by('id')
        small_id = events[0].id
        embeding_vectors = [json.loads(event.embeding_vector) for event in events]
        result_ids_event = (self.model_reducer
                            .similarity_search(text_achievements,
                                               embeding_vectors))
        result_events = [
            Event.objects.get(id=event_id[0] + small_id)
            for event_id in result_ids_event
        ]
        serializer = EventSerializer(result_events, many=True)
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


class VariantQuestionViewSet(ModelViewSet):
    serializer_class = VariantQuestionSerializer
    queryset = VariantQuestion.objects.all()
    logger = get_logger('VariantQuestionViewSet')


class QAViewSet(ViewSet):
    chatbot_reducer = ChatBotReducer()
    @swagger_auto_schema(
        request_body=QAQustionSerializer,
        responses={200: QAQustionSerializer}
    )
    @action(methods=['post'], detail=False)
    def question(self, request):
        serializer = QAQustionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        text = serializer.validated_data['text']
        answer = self.chatbot_reducer.get_answer(text)
        serializer = QAQustionSerializer(data={'text': answer})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=200)