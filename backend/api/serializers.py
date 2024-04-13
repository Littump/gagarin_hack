from api import models
from djoser.serializers import UserSerializer
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = '__all__'


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Achievement
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return models.Achievement.objects.create(**validated_data)


class PointUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PointUp
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return models.PointUp.objects.create(**validated_data)


class UserCustomSerializer(UserSerializer):
    achievements = SerializerMethodField()
    points_up = SerializerMethodField()

    class Meta:
        model = models.User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'specialization',
            'university_group',
            'achievements',
            'points_up'
        )

    def get_achievements(self, obj):
        return AchievementSerializer(obj.achievements.all(), many=True).data

    def get_points_up(self, obj):
        return PointUpSerializer(obj.points_up.all(), many=True).data


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Service
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = '__all__'


class TestSerializer(serializers.ModelSerializer):
    questions = SerializerMethodField()

    class Meta:
        model = models.Test
        fields = '__all__'

    def get_questions(self, obj):
        return QuestionSerializer(obj.questions.all(), many=True).data
