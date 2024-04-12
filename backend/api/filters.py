from api.models import Event
from django_filters.rest_framework import CharFilter, FilterSet


class EventFilter(FilterSet):
    name = CharFilter(lookup_expr='icontains')

    class Meta:
        model = Event
        fields = ['name', 'kind']
