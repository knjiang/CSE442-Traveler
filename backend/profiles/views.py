from os import name
from typing import List
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework import authentication
from django.contrib.auth.models import User
from .models import Profile, LocationList, Location, SavedLocation
from .serializers import ProfileSerializer
from rest_framework.renderers import JSONRenderer
import json

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


class AddLocationListView(APIView):
    """
    Add locations to a list from view

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        list_name = request.data['listName']
        location_name = request.data['locationName']
        if list_name and location_name:
            choseListID = LocationList.objects.get(name = list_name).id
            savedListID = SavedLocation.objects.filter(list = choseListID)
            if savedListID.values_list("name", flat = True):
                locationsConverted = []
                for m in list(savedListID.values_list("name", flat = True)):
                    locationsConverted.append(Location.objects.get(id = m).name)

                if location_name in locationsConverted:
                    print("Location already In list.",  "__________________________________________________________________________")
                    return HttpResponseNotFound()
                else:
                    print("Not in list, inserting.",  "__________________________________________________________________________")
                    locationInstance = Location.objects.get(name = location_name)
                    locationListInstance = LocationList.objects.get(name = list_name)
                    SavedLocation.objects.create(list = locationListInstance, name = locationInstance)
                    return HttpResponse()
            else:
                print("List empty, inserting.",  "__________________________________________________________________________")
                locationInstance = Location.objects.get(name = location_name)
                locationListInstance = LocationList.objects.get(name = list_name)
                SavedLocation.objects.create(name = locationInstance,list = locationListInstance)
                return HttpResponse()

class DeleteLocationListView(APIView): 
    """
    Delete locations to a list from view

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        list_name = request.data['listName']
        location_name = request.data['locationName']
        locationID = Location.objects.get(name = location_name)
        listID = LocationList.objects.get(name = list_name)
        savedLocationID = SavedLocation.objects.get(name = locationID,list = listID).id
        SavedLocation.objects.get(id = savedLocationID).delete()
        
        profile = get_object_or_404(Profile,pk=request.user.id)
        lists = [location.name for location in LocationList.objects.filter(profile=profile)]
        listData = {}
        for m in lists:
            convertedLocal = []
            i = LocationList.objects.get(name = m).id
            local = [l for l in SavedLocation.objects.filter(list=i).values_list("name_id", flat="true")]
            for k in local:
                localName = Location.objects.filter(id = k).values_list("name", flat="true")
                convertedLocal.append(localName[0])
            listData[m] = convertedLocal
        #Array of objects
        return Response({
            "lists" : listData
        })



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

class DeleteListView(APIView): 
    """
    Delete locations to a list from view

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        list_name = request.data['listName']
        listID = LocationList.objects.get(name = list_name)
        allList = [list for list in SavedLocation.objects.filter(list = listID)]
        for m in allList:
            m.delete()
        listID.delete()

        profile = get_object_or_404(Profile,pk=request.user.id)
        lists = [location.name for location in LocationList.objects.filter(profile=profile)]
        listData = {}
        for m in lists:
            convertedLocal = []
            i = LocationList.objects.get(name = m).id
            local = [l for l in SavedLocation.objects.filter(list=i).values_list("name_id", flat="true")]
            for k in local:
                localName = Location.objects.filter(id = k).values_list("name", flat="true")
                convertedLocal.append(localName[0])
            listData[m] = convertedLocal
        #Array of objects
        return Response({
            "lists" : listData
        })

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

class GetAllProfilesView(APIView):
    """
    View to get all users
    """
    def get(self, request, format=None):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        data = JSONRenderer().render(serializer.data)
        data = json.loads(data)
        user_list = []
        for i in range(0,len(data)):
            primary = data[i]['id']
            profile = get_object_or_404(Profile,pk=primary)
            user_list.append(profile.user.email)
        return Response({"users" : user_list}) 

class GetUserListsView(APIView):
    """
    View to get own lists

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        """
        Return your own lists in JSON format.
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        lists = [location.name for location in LocationList.objects.filter(profile=profile)]
        return Response({
            "lists" : lists
        })
    
class GetListDataView(APIView):
    """
    View to get own lists

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        """
        Return your own lists in JSON format.
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        lists = [location.name for location in LocationList.objects.filter(profile=profile)]
        listData = {}
        for m in lists:
            convertedLocal = []
            i = LocationList.objects.get(name = m).id
            local = [l for l in SavedLocation.objects.filter(list=i).values_list("name_id", flat="true")]
            for k in local:
                localName = Location.objects.filter(id = k).values_list("name", flat="true")
                convertedLocal.append(localName[0])
            listData[m] = convertedLocal
        #Array of objects
        return Response({
            "lists" : listData
        })
    