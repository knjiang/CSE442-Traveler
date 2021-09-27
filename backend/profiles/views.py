from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication
from django.contrib.auth.models import User
from .models import Profile, LocationList, Location, SavedLocation

class GetProfileView(APIView):
    """
    View to get own profile

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        """
        Return your own profile in JSON format.
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        return Response({
            "first_name" : profile.user.first_name,
            "email" : profile.user.email,
            "from_location": profile.from_location,
        })

class ChangeLocationView(APIView):
    """
    View to change location

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Change Profile Location
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        new_location = request.data['location']
        profile.from_location = new_location
        profile.save()
        return Response()
    
class ChangeListView(APIView):
    """
    View to change list

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Change Profile Location
        Parameters:
        {
            'name' : <list_name> (string)
            'list' : [<location_name>] (array of strings)
        }
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        list_name = request.data['name']
        if LocationList.objects.filter(profile=profile,name=list_name).exists():
            my_location_list = LocationList.objects.get(profile=profile,name=list_name)
        else:
            my_location_list = LocationList.objects.create(profile=profile,name=list_name)
        location_list = request.data['list'].split(",")
        for location in location_list:
            if Location.objects.filter(name=location).exists():
                loc_obj = Location.objects.get(name=location)
            else:
                loc_obj = Location.objects.create(name=location)
            SavedLocation.objects.create(name=loc_obj,list=my_location_list)
        return Response()

class SearchUserView(APIView):
    """
    View to get searched user

    """
    def get(self, request, format=None):
        searched_email = request.query_params.get('user_email')
        print(searched_email)
        user_query = get_object_or_404(Profile,user__email=searched_email)
        
        # print(user_query.from_location)
        
        return Response({
            "first_name" : user_query.user.first_name,
            "email" : user_query.user.email,
            "from_location" : user_query.from_location,
        })
