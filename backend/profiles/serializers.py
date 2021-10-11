from rest_framework import serializers
from .models import Profile, Language, LocationList, Location, SavedLocation

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

class SavedLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedLocation
        fields = '__all__'

class ListSerializer(serializers.ModelSerializer):
    savedLocation = SavedLocationSerializer(many=True,read_only=True)
    class Meta:
        model = LocationList
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    languages = LanguageSerializer(many=True,read_only=True)
    lists = ListSerializer(many=True,read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'