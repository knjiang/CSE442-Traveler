from rest_framework import serializers
from .models import Profile, Language

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'
        
class ProfileSerializer(serializers.ModelSerializer):
    languages = LanguageSerializer(many=True,read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'
