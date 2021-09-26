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
<<<<<<< HEAD
        fields = '__all__'
=======
>>>>>>> 3e1f2d283607283cee1a972783b8d0f9bc999b5a

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
