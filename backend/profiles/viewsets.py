from .models import Profile,Language
from .serializers import ProfileSerializer,LanguageSerializer
from rest_framework import viewsets

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer