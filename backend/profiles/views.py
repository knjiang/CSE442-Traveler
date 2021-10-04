from os import name
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseNotFound
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


class AddDeleteLocationList(APIView):
    """
    Add or delete locations from view

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        profile = get_object_or_404(Profile,pk=request.user.id)
        list_name = request.data['listName']
        location_name = request.data['locationName']

        querySet = SavedLocation.objects.filter(list__name = list_name)
        savedListID = querySet.values_list('name', flat=True)
        savedConvertList = []
        for m in savedListID:
            savedConvertList.append(m)

        if location_name in savedConvertList:
            print("Locaiton already In list.")
            return HttpResponseNotFound()
        else:
            print("Not in list, inserting.")
            locationInstance = Location.objects.get(name = location_name)
            locationListInstance = LocationList.objects.get(name = list_name)
            SavedLocation.objects.create(list = locationListInstance, name = location_name)
            return HttpResponse()
        '''
        querySet = SavedLocation.objects.filter(list__name = list_name)
        savedListID = querySet.values_list('pk', flat=True)
        savedConvertList = []
        for m in savedListID:
            savedConvertList.append(Location.objects.filter(id = m).values('name'))
        
        if location_name in savedConvertList:
            return HttpResponseNotFound()
        else:
            locationInstance = Location.objects.get(name = location_name)
            locationListInstance = LocationList.objects.get(name = list_name)
            SavedLocation.objects.create(list = locationListInstance, name = location_name)
            return HttpResponse()
        '''
        return Response()

class AddListView(APIView):
    """
    Add new list if not exists

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
        list_name = request.data['listName']
        if LocationList.objects.filter(profile=profile,name=list_name).exists():
            return HttpResponseNotFound()
        else:
            LocationList.objects.create(profile=profile,name=list_name)
            return HttpResponse()

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
