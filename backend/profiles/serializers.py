from rest_framework import serializers
from .models import Profile, Language, Location

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'
        
class ProfileSerializer(serializers.ModelSerializer):
    languages = LanguageSerializer(many=True,read_only=True)
    class Meta:
        model = Profile

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
