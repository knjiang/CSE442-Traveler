from typing import List
from .models import Profile,Language,LocationList,Location,SavedLocation
from .serializers import ProfileSerializer,LanguageSerializer,ListSerializer,LocationSerializer,SavedLocationSerializer
from rest_framework import viewsets

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class ListViewSet(viewsets.ModelViewSet):
    queryset = LocationList.objects.all()
    serializer_class = ListSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class SavedLocationViewSet(viewsets.ModelViewSet):
    queryset = SavedLocation.objects.all()
    serializer_class = SavedLocationSerializer