import json
from channels.generic.websocket import WebsocketConsumer
from rest_framework.authtoken.models import Token
from asgiref.sync import async_to_sync
from django.contrib.auth.models import User
from .models import Chat, Messages
from profiles.models import Profile, Location, LocationList, SavedLocation
from forums.models import Post, Comment, Emoji
from django.db.models import Q
from django.shortcuts import get_object_or_404

class ChatConsumer(WebsocketConsumer):

    def connect(self):
        token = ''
        if 'token' in self.scope['cookies'].keys():
            token = self.scope['cookies']['token']
        if token:
            self.user_id = Token.objects.get(key=token).user.id
            self.user_email = Token.objects.get(key=token).user.email
            self.room_group_name = 'room-{}'.format(self.user_id)
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            userInstance = Profile.objects.get(pk = self.user_id)
            chatLog = userInstance.chat_set.all()
            res = []
            for c in chatLog:
                temp = {}
                users = []
                messages = []
                for u in c.users.all():
                    users.append(u.user.email)
                for a in c.chatLog.all():
                    messages.append({"sender": a.sender.user.email, "message": a.message})
                temp["id"] = c.id
                temp["users"] = users
                temp["peek"] = messages[0] if messages else []
                temp["type"] = c.type
                temp["name"] = c.name
                temp["nameChanged"] = c.nameChanged
                res.append(temp)
            self.accept()
            self.send(text_data=json.dumps({
                'status': 'updateConnected',
                'chat': res
            }))
        else:
            pass

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    #outwards
    def receive(self, text_data):
        data = json.loads(text_data)
        if data["status"] == "send":
            sender = get_object_or_404(Profile,user__email=data['from'])
            id = data['info']['id']
            users = data['info']['users']
            message = data['message']
            chat = Chat.objects.get(pk = id)
            Messages.objects.create(sender = sender, message = message, chat = chat)
            ids = []
            for m in users:
                u = get_object_or_404(Profile,user__email=m)
                ids.append(u.id)
            for i in ids:
                async_to_sync(self.channel_layer.group_send)(
                    'room-{}'.format(i),
                    {
                        'type': 'chat_message',
                        'message': message,
                        'from': data['from'],
                        'id': id,
                        'users': users,
                        'new': data['new'],
                        'nameChanged': chat.nameChanged,
                        'name': chat.name
                    }
                )
            chat.save()
        elif data["status"] == "get":
            id = data["id"]
            chat = Chat.objects.get(pk = id)
            messages = []
            for a in chat.chatLog.all():
                messages.append({"sender": a.sender.user.email, "message": a.message})
            self.send(text_data=json.dumps({
                'status': 'receiveMessages',
                'message': messages
            }))

    #inwards
    def chat_message(self, event):
        message = event['message']
        sender = event['from']
        id = event['id']
        users = event['users']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'status': 'updateChat',
            'message': message,
            'from': sender,
            'id': id,
            'users': users,
            'new': event['new'],
            'nameChanged': event['nameChanged'],
            'name': event['name']
        }))