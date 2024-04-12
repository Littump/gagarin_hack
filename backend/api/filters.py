from django_filters.rest_framework import FilterSet, CharFilter
from api.models import Event


class EventFilter(FilterSet):
    name = CharFilter(lookup_expr='icontains')

    class Meta:
        model = Event
        fields = ['name', 'kind']
