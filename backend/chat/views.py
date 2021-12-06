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
from django.db.models import Q, Count

from .models import Chat, Messages
from profiles.models import Profile


class CreateChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Creates a group chat
        """
        users = request.data['users'] #emails
        message = request.data['message']
        profile = get_object_or_404(Profile,pk=request.user.id)
        if len(users) > 1:
            #group chat
            group = Chat()
            group.save()
            group.users.add(profile)
            for u in users:
                group.users.add(get_object_or_404(Profile,user__email = u))
            group.save()
            newName = ''
            for u in group.users.all():
                newName += u.user.email
                newName += ', '
            newName = newName[:-2]
            group.name = newName
            group.type = "Group"
            group.nameChanged = False
            group.save()
            emails = []
            for m in group.users.all():
                emails.append(m.user.email)
            return Response({
                'new': True,
                "id": group.id,
                "name": emails,
                "users": emails,
                "nameChanged": group.nameChanged,
                'message': message
            })
        else:
            partner = get_object_or_404(Profile,user__email = users[0])
            b = Chat.objects.annotate(count=Count('users')).filter(count=len([profile.id, partner.id]))
            exists = False
            for i in b:
                if (partner in i.users.all() and profile in i.users.all() and i.type == "Single"):
                    exists = True
            if exists:#Chat.objects.filter(type = "Single", users__in = [profile.id, partner.id]).exists():
                chat = Chat.objects.get(type = "Single", users = (profile.id, partner.id))
                emails = []
                for m in chat.users.all():
                    emails.append(m.user.email)
                return Response({
                    'new': False,
                    "id": chat.id,
                    "name": chat.name if chat.nameChanged else emails, 
                    "users": emails,
                    "nameChanged": chat.nameChanged,
                    "message": message
                })
            else:
                dm = Chat()
                dm.save()
                dm.users.add(profile)
                dm.users.add(get_object_or_404(Profile,user__email = users[0]))
                dm.save()
                dm.name = request.user.email + ', ' + users[0]
                dm.type = "Single"
                dm.nameChanged = False
                dm.save()
                emails = []
                for m in dm.users.all():
                    emails.append(m.user.email)
                return Response({
                    'new': True,
                    "id": dm.id,
                    "name": emails,
                    "users": emails,
                    "nameChanged": dm.nameChanged,
                    'message': message
                })
            
class GetChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
        
    def post(self, request, format=None):
        id = request.data["id"]
        chat = Chat.objects.get(pk = id)
        messages = []
        for a in chat.chatLog.all():
            messages.append({"sender": a.sender.user.email, "message": a.message})
        return Response({
            "id": id,
            "messages": messages
        })

class DeleteChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
        
    def post(self, request, format=None):
        """
        Deletes chat with id
        """
        id = request.data["id"]
        Chat.objects.get(pk = id).delete()
        return Response()

class AddToGroupChatView(APIView):
    def post(self, request, format=None):
        """
        Add a [user[s]] to a group chat
        """
        id = request.data['id']
        users = request.data['users']
        chat = get_object_or_404(Chat,pk = id)
        for u in users:
            profile = get_object_or_404(Profile,user__email = u)
            chat.users.add(profile)

        return Response()

class RemoveFromGroupChatView(APIView):
    def post(self, request, format = None):
        '''
        Remove a user from group chat
        '''
        id = request.data['id']
        user = request.data['user']
        chat = Chat.objects.get(pk = id)
        profile = get_object_or_404(Profile,user__email = user)
        chat.users.remove(profile)
        chat.save()

        return Response()

class DeleteFromGroupChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Delete a user a group chat
        """
        id = request.data['id']

        return Response()
    
class RenameChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Changes group chat name
        """
        id = request.data['id']
        name = request.data['name']

        chat = Chat.objects.get(pk = id)
        chat.name = name
        chat.nameChanged = True
        chat.save()

        return Response()

class DeleteAllGroupChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Delete all group chats
        """

        return Response()

class GetRecentChatView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        """
        Delete all group chats
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        chatLog = profile.chat_set.all()
        counter = 0
        res = []
        users = []
        for c in chatLog:
            if counter < 5:
                for u in c.users.all():
                    users.append(u.user.email)
                res.append({"id": c.id, "name": c.name, "nameChanged": c.nameChanged, "type": c.type, "users": users})
            else:
                break
            counter += 1
            users = []
        return Response(res)