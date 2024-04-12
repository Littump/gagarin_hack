from django.urls import include, path
from rest_framework.routers import DefaultRouter

# from api.views import ApiViewSet


app_name = 'api'

v1_router = DefaultRouter()
# v1_router.register('', ApiViewSet, basename=app_name)

urlpatterns = [
    path('', include('djoser.urls')),
    path("auth/", include("djoser.urls.authtoken")),
    path('', include(v1_router.urls)),
]
