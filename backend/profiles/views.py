
from os import name
from typing import List
from django.core.exceptions import RequestAborted
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework import authentication
from django.contrib.auth.models import User
from .models import ListDescriptions, Profile, LocationList, Location, SavedLocation, ShareableLink, ShareableListPageComment
from chat.models import Chat, Messages
from forums.models import Forum, Post, Comment, Emoji
from .serializers import ProfileSerializer
from rest_framework.renderers import JSONRenderer
import json
import uuid

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
            "background": profile.background,
            "visited": profile.visited,
            "displayName": profile.displayName,
            "profileLocation": profile.profileLocation,
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
    Adds a location to a the specified list

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        '''
        Input is (name of list, name of location)
        Output returns response if location is added succesfully, error is location is unable to be added
        '''
        profile = get_object_or_404(Profile,pk=request.user.id)
        list_name = request.data['listName']
        location_name = request.data['locationName'].replace("-", " ")
        if list_name and location_name:
            choseListID = LocationList.objects.filter(profile=profile,name=list_name).values_list('pk', flat=True)[0]
            savedListID = SavedLocation.objects.filter(list = choseListID)
            if savedListID.values_list("name", flat = True):
                locationsConverted = []
                for m in list(savedListID.values_list("name", flat = True)):
                    locationsConverted.append(Location.objects.get(id = m).name)

                if location_name in locationsConverted:
                    return HttpResponseNotFound()
                else:
                    locationInstance = Location.objects.get(name = location_name)
                    locationListInstance = LocationList.objects.filter(profile=profile,name=list_name)[0]
                    SavedLocation.objects.create(list = locationListInstance, name = locationInstance)
                    return HttpResponse()
            else:
                locationInstance = Location.objects.get(name = location_name)
                locationListInstance = LocationList.objects.filter(profile=profile,name=list_name)[0]
                SavedLocation.objects.create(name = locationInstance,list = locationListInstance)
                return HttpResponse()

class DeleteLocationListView(APIView): 
    """
    Deletes a location from the specified list

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        profile = get_object_or_404(Profile,pk=request.user.id)
        list_name = request.data['listName']
        location_name = request.data['locationName']
        locationID = Location.objects.get(name = location_name)
        listID = LocationList.objects.filter(profile=profile,name=list_name).values_list('pk', flat=True)[0]
        savedLocationID = SavedLocation.objects.get(name = locationID,list = listID).id
        SavedLocation.objects.get(id = savedLocationID).delete()
        
        lists = [location.name for location in LocationList.objects.filter(profile=profile)]
        listData = {}
        for m in lists:
            convertedLocal = []
            i = LocationList.objects.filter(profile=profile,name=m).values_list('pk', flat=True)[0]
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
    Adds a new list to profile if it does not exist

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Input is ()
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
        profile = get_object_or_404(Profile,pk=request.user.id)
        list_name = request.data['listName']
        listID = LocationList.objects.get(profile = profile, name = list_name)
        allList = [list for list in SavedLocation.objects.filter(list = listID)]
        for m in allList:
            m.delete()
        listID.delete()

        lists = [location.name for location in LocationList.objects.filter(profile=profile)]
        listData = {}
        for m in lists:
            convertedLocal = []
            i = LocationList.objects.filter(profile=profile,name=m).values_list('pk', flat=True)[0]
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
        user_query = get_object_or_404(Profile,user__email=searched_email)
        
        # print(user_query.from_location)
        
        return Response({
            "first_name" : user_query.user.first_name,
            "email" : user_query.user.email,
            "from_location" : user_query.from_location,
            "background": user_query.background,
            "visited": user_query.visited,
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
            i = LocationList.objects.filter(profile=profile,name=m).values_list('pk', flat=True)[0]
            local = [l for l in SavedLocation.objects.filter(list=i).values_list("name_id", flat="true")]
            for k in local:
                localName = Location.objects.filter(id = k).values_list("name", flat="true")
                convertedLocal.append(localName[0])
            listData[m] = convertedLocal
        #Array of objects
        return Response({
            "lists" : listData
        })
    
class AddLocationView(APIView):
    def post(self, request, format=None):
        """
        Adds a new location to db
        """
        name = request.data['name']
        if type(json.loads(name)) is list:
            for c in json.loads(name):
                if (Location.objects.filter(name = c)):
                    pass
                else:
                    Location.objects.create(name = c)
        else:
            name = json.loads(name)
            if (Location.objects.filter(name = name)):
                pass
            else:
                Location.objects.create(name = name)
        return HttpResponse()

class DelLocationView(APIView):

    def post(self, request, format=None):
        """
        Adds a new location to db
        """
        name = request.data['name']
        if name == "AllExistingLocations":
            Location.objects.all().delete()
            return HttpResponse()
        else:
            if (Location.objects.filter(name = name)):
                Location.objects.filter(name = name).delete()
                return HttpResponse()
            else:
                return HttpResponseNotFound()


class ChangeBackgroundView(APIView):
    """
    View to change background 
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        View to change background.
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        profile.background = request.data['background']
        profile.save()
        return Response()


class ChangeUserNameView(APIView):
    """
    View to change name 
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        View to change name.
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        profile.displayName = request.data['displayName']
        profile.save()
        return Response()



class ChangeProfileLocationView(APIView):
    """
    View to change name 
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        View to change name.
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        profile.profileLocation = request.data['profileLocation']
        profile.save()
        return Response()



class ChangeVisitedView(APIView):
    """
    View to change displayed visited countries
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        View to change visited.
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        profile.visited = request.data['visited']
        profile.save()
        return Response()


class GetSetShareableLink(APIView):
    """
    View to get/set shareable link
    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        profile = get_object_or_404(Profile,pk=request.user.id)
        location_list = get_object_or_404(LocationList, profile=profile,name=request.data['listName'])
        if not ShareableLink.objects.filter(origin_list=location_list).exists():
            random_url = uuid.uuid4()
            ShareableLink.objects.create(origin_list=location_list,url=random_url)
        shareable_link = get_object_or_404(ShareableLink,origin_list=location_list)
        return Response({
            "url" : shareable_link.url
        })

class GetShareableLinkList(APIView):
    """
    View to get shareable link contents
    * Requires token authentication.
    """

    def get(self, request, format=None):
        url = request.query_params.get('url')
        shareable_link = get_object_or_404(ShareableLink,url=url)
        location_list = shareable_link.origin_list
        locations = location_list.savedlocation_set.all()
        return Response({
            "title" : location_list.name,
            "locations" : [str(location.name) for location in locations],
            "created_by" : str(location_list.profile),
        })

class AddDescriptionView(APIView):
    """
    Add Descriptions for LocationList
    * requires token authentication.
    """
    def post(self,request, format=None):
        profile = get_object_or_404(Profile, pk=request.user.id)
        description = request.data['ListDescription']
        list = request.data['LocationList']
        listInstance = LocationList.objects.get(name = list) #gets instance of model
        if(ListDescriptions.objects.filter(description = description, list=listInstance).exists()):
            return HttpResponseNotFound()
        else:
            ListDescriptions.objects.create(description = description, list=listInstance)
            return HttpResponse()

class DelDescriptionView(APIView):
    """
    Deletes a ListDescription in LocationList
    """
    def post(self,request,format=None):
        description = request.data['ListDescription']
        list = request.data['LocationList']
        profile = get_object_or_404(Profile,pk=request.user.id)
        listInstance = LocationList.objects.get(name = list)
        if(ListDescriptions.objects.get(list = listInstance)):
            ListDescriptions.objects.get(list = listInstance).delete()
            return HttpResponse()
        else:
            return HttpResponseNotFound()

class EditDescriptionView(APIView):
    """
    Edits a ListDescription in LocationList
    """
    def post(self,request,format=None):
        description = request.data['ListDescription']
        list = request.data['LocationList']
        newDescription = request.data['NewDescription']
        listInstance = LocationList.objects.get(name = list)
        obj = ListDescriptions.objects.get(list = listInstance)
        obj.description = newDescription
        obj.save()
        return HttpResponse()

class GetDescriptionView(APIView):
    """
    Gets a ListDescription for specified LocationList
    """
    def get(self,request,format=None):
        list = request.query_params.get('list')
        profile = get_object_or_404(Profile,pk=request.user.id)
        listInstance = LocationList.objects.get(profile=profile, name = list)
        if ListDescriptions.objects.filter(list = listInstance).exists():
            return Response({
                "listDescriptions": ListDescriptions.objects.filter(list = listInstance).values_list("description", flat = True)[0]
            })
        else:
            return Response({
                "listDescriptions": ""
            })



class AddVisitedView(APIView):
    """
    Adds a new list to profile if it does not exist

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Input is ()
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        list_name = request.data['listName']
        if LocationList.objects.filter(profile=profile,name=list_name).exists():
            return HttpResponseNotFound()
        else:
            LocationList.objects.create(profile=profile,name=list_name)
            return HttpResponse()


class DeleteVisitedView(APIView): 
    """
    Delete locations to a list from view

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        profile = get_object_or_404(Profile,pk=request.user.id)
        list_name = request.data['listName']
        listID = LocationList.objects.get(profile = profile, name = list_name)
        allList = [list for list in SavedLocation.objects.filter(list = listID)]
        for m in allList:
            m.delete()
        listID.delete()

        lists = [location.name for location in LocationList.objects.filter(profile=profile)]
        listData = {}
        for m in lists:
            convertedLocal = []
            i = LocationList.objects.filter(profile=profile,name=m).values_list('pk', flat=True)[0]
            local = [l for l in SavedLocation.objects.filter(list=i).values_list("name_id", flat="true")]
            for k in local:
                localName = Location.objects.filter(id = k).values_list("name", flat="true")
                convertedLocal.append(localName[0])
            listData[m] = convertedLocal
        #Array of objects
        return Response({
            "lists" : listData
        })


class GetVisitedDataView(APIView):
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
            i = LocationList.objects.filter(profile=profile,name=m).values_list('pk', flat=True)[0]
            local = [l for l in SavedLocation.objects.filter(list=i).values_list("name_id", flat="true")]
            for k in local:
                localName = Location.objects.filter(id = k).values_list("name", flat="true")
                convertedLocal.append(localName[0])
            listData[m] = convertedLocal
        #Array of objects
        return Response({
            "lists" : listData
        })

class GetSharedListCommentView(APIView):
    """
        View to get all comments in a shared list
    """

    def get(self, request, format=None):
        url = request.query_params.get('url')
        shareable_link = get_object_or_404(ShareableLink,url=url)
        comments = []
        if (ShareableListPageComment.objects.filter(shareable_list=shareable_link).exists()):
            for comment in ShareableListPageComment.objects.filter(shareable_list=shareable_link):
                comments.append([comment.profile.user.email, comment.body])
        return Response({"list_comments": comments})


class AddSharedListCommentView(APIView):
    """
        View to add a commment to shared list
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        my_profile = get_object_or_404(Profile,pk=request.user.id)
        url = get_object_or_404(ShareableLink,url=request.data['shared_list'])
        comment = request.data['comment_text']        
        ShareableListPageComment.objects.create(body=comment,shareable_list=url,profile=my_profile)
        return Response()

class ResetView(APIView):
    '''
    Deletes all objects for specified model
    '''
    def post(self, request, format = None):
        obj = request.data['obj']
        authorized = ['312baron@gmail.com', 'huangbaron2@gmail.com', 'baronhua@buffalo.edu', 'kjiang1991@gmail.com', 'frankyan@buffalo.edu', 'bcisneros947@gmail.com', 'ahom2@buffalo.edu', 'kenjiang@buffalo.edu']
        if request.user.email in authorized:
            if (obj == 'all'):
                Messages.objects.all().delete()
                Chat.objects.all().delete()
                LocationList.objects.all().delete()
                Location.objects.all().delete()
                Post.objects.all().delete()
                Comment.objects.all().delete()
                Emoji.objects.all().delete()
                User.objects.all().delete()
                Profile.objects.all().delete()
            elif (obj == 'message'):
                Messages.objects.all().delete()
                Chat.objects.all().delete()
        return Response()
