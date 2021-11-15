from os import name
from typing import List
from django.core.exceptions import RequestAborted
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework import authentication
from django.contrib.auth.models import User
from rest_framework.renderers import JSONRenderer
import json

from .models import GroupChatMessages, LastSent, Messages, GroupChat
from profiles.models import Profile


class CreateGroupChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Creates a group chat
        """
        name = request.data['name']
        users = request.data['users'] #emails
        profile = get_object_or_404(Profile,pk=request.user.id)
        GroupChat.objects.all().delete()
        group = GroupChat()
        group.save()
        group.users.add(profile)
        if (users):
            for u in users:
                group.users.add(get_object_or_404(Profile,user__email = u))
        group.save()
        newName = ''
        for u in group.users.all():
            newName += u.user.email
            newName += ', '
        newName = newName[:-2]
        group.name = newName
        group.save()

        return Response()

class DeleteGroupChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
        
    def post(self, request, format=None):
        """
        Adds a new location to db
        """
        id = request.data['id']
        group = GroupChat.objects.get(pk = id)
        group.delete()

        return Response()

class AddToGroupChatView(APIView):
    def post(self, request, format=None):
        """
        Add a [user[s]] to a group chat
        """
        id = request.data['id']
        group = GroupChat.objects.get(pk = id)

        users = request.data['users'] #emails
        for u in users:
            profile = get_object_or_404(Profile,user__email = u)
            group.users.add(profile)
        group.save()

        newName = ''
        for u in group.users.all():
            newName += u.user.email
            newName += ', '
        newName = newName[:-2]
        group.name = newName
        group.save()

        return Response()

class DeleteFromGroupChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Delete a user a group chat
        """
        id = request.data['id']
        group = GroupChat.objects.get(pk = id)
        user = request.data['user'] #emails
        profile = get_object_or_404(Profile,user_email = user)
        group.users.remove(profile)
        group.save()

        if len(group.users.all()) == 0:
            group.delete()
        else:    
            newName = ''
            for u in group.users.all():
                newName += u.user.email
                newName += ', '
            newName = newName[:-2]
            group.name = newName
            group.save()

        return Response()
    
class ChangeGroupChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Changes group chat name
        """
        id = request.data['id']
        name = request.data['name']
        group = GroupChat.objects.get(pk = id)
        group.name = name
        group.save()

        return Response()

class DeleteAllGroupChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Delete all group chats
        """
        GroupChat.objects.all.delete()

        return Response()