from api import models
from djoser.serializers import UserSerializer
from reducers.model_reducer import ModelReducer
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField


class EventSerializer(serializers.ModelSerializer):
    model_reducer = ModelReducer()

    class Meta:
        model = models.Event
        fields = '__all__'

    def create(self, validated_data):
        text = validated_data['name'] + ' ' + validated_data['description']
        embeding_vector = self.model_reducer.get_embedding(text)
        validated_data['embeding_vector'] = embeding_vector
        return models.Event.objects.create(**validated_data)


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Achievement
        exclude = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return models.Achievement.objects.create(**validated_data)


class PointUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PointUp
        exclude = ['user']

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


class VariantQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.VariantQuestion
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    variants = SerializerMethodField()

    class Meta:
        model = models.Question
        fields = '__all__'

    def get_variants(self, obj):
        return VariantQuestionSerializer(obj.variants.all(), many=True).data


class TestSerializer(serializers.ModelSerializer):
    is_complete = SerializerMethodField()
    percentage = SerializerMethodField()
    questions = SerializerMethodField()

    class Meta:
        model = models.Test
        fields = '__all__'

    def get_questions(self, obj):
        return QuestionSerializer(obj.questions.all(), many=True).data

    def get_is_complete(self, obj):
        result = models.UserTest.objects.filter(
            user=self.context['request'].user,
            test=obj,
        )
        if result:
            return result[0].is_complete
        return False

    def get_percentage(self, obj):
        result = models.UserTest.objects.filter(
            user=self.context['request'].user,
            test=obj,
        )
        if result:
            return result[0].percentage
        return 0


class UserTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserTest
        exclude = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return models.UserTest.objects.create(**validated_data)


class QAQustionSerializer(serializers.ModelSerializer):
    text = serializers.CharField(max_length=2047)