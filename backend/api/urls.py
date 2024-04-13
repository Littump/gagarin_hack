from api import views
from django.urls import include, path
from rest_framework.routers import DefaultRouter

v1_router = DefaultRouter()

v1_router.register('events',
                   views.EventViewSet,
                   basename='events')

v1_router.register('achievements',
                   views.AchievementViewSet,
                   basename='achievements')

v1_router.register('pointups',
                   views.PointUpViewSet,
                   basename='pointups')

v1_router.register('services',
                   views.ServiceViewSet,
                   basename='services')

v1_router.register('questions',
                   views.QuestionViewSet,
                   basename='questions')

v1_router.register('tests',
                   views.TestViewSet,
                   basename='tests')

v1_router.register('results',
                   views.UserTestViewSet,
                   basename='results')

v1_router.register('variants',
                   views.VariantQuestionViewSet,
                   basename='variants')

urlpatterns = [
    path('', include('djoser.urls')),
    path("auth/", include("djoser.urls.authtoken")),
    path('', include(v1_router.urls)),
]
