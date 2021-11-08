import json
from channels.generic.websocket import WebsocketConsumer
from rest_framework.authtoken.models import Token
from asgiref.sync import async_to_sync
from django.contrib.auth.models import Group, User
from .models import Messages, LastSent
from profiles.models import Profile, Location, LocationList, SavedLocation
from forums.models import Post, Comment, Emoji
from django.db.models import Q

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
            logs = Messages.objects.filter(Q(profile = userInstance)|
                                            Q(sender = userInstance)).values_list("sender", "profile").distinct().order_by('creationDate').distinct()
            messaged = len(set(logs))
            count = 0
            res = []
            ids = []
            for i in logs.reverse():
                if count >= messaged:
                    break
                if i[0] not in ids and i[0] != self.user_id:
                    ids.append(i[0])
                    count += 1
                if i[1] not in ids and i[1] != self.user_id:
                    ids.append(i[1])
                    count += 1
            for i in ids:
                p = Profile.objects.get(pk = i).user.email
                if p != userInstance.user.email:
                    res.append(Profile.objects.get(pk = i).user.email)

            logs = LastSent.objects.filter(Q(user_1 = userInstance)|
                                            Q(user_2 = userInstance))
            lastSent = {}
            for m in logs:
                if m.user_1 != userInstance:
                    lastSent[m.user_1.user.email] = m.messages
                if m.user_2 != userInstance:
                    lastSent[m.user_2.user.email] = m.messages
            self.accept()
            self.send(text_data=json.dumps({
                'status': 'updateConnected',
                'users': res,
                'lastSent': lastSent
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
            receiver = data["receiver"]
            message = data["message"]
            self.receiver_id = User.objects.get(email__exact=receiver).id
            # Send message to room group
            receiverInstance = Profile.objects.get(pk = self.receiver_id)
            senderInstance = Profile.objects.get(pk = self.user_id)
            Messages.objects.create(sender = senderInstance, profile = receiverInstance, messages = message)
            async_to_sync(self.channel_layer.group_send)(
                'room-{}'.format(self.receiver_id),
                {
                    'type': 'chat_message',
                    'message': message,
                    'from': self.user_id
                }
            )
            if LastSent.objects.filter(user_1 = senderInstance, user_2 = receiverInstance).first():
                LastSent.objects.get(user_1 = senderInstance, user_2 = receiverInstance).delete()
                LastSent.objects.create(user_1 = senderInstance, user_2 = receiverInstance, messages = message)
            else:
                LastSent.objects.create(user_1 = senderInstance, user_2 = receiverInstance, messages = message)

            if LastSent.objects.filter(user_2 = senderInstance, user_1 = receiverInstance).first():
                LastSent.objects.get(user_2 = senderInstance, user_1 = receiverInstance).delete()
                LastSent.objects.create(user_2 = senderInstance, user_1 = receiverInstance, messages = message)
            else:
                LastSent.objects.create(user_2 = senderInstance, user_1 = receiverInstance, messages = message)
            self.send(text_data=json.dumps({
                'status': 'updateChat',
                'message': message,
                'from': self.user_email,
                'to': User.objects.get(email__exact=receiver).email
            }))
        elif data["status"] == "get":
            friend = data["user"]
            self.friend_id = User.objects.get(email__exact=friend).id
            friendInstance = Profile.objects.get(pk = self.friend_id)
            userInstance = Profile.objects.get(pk = self.user_id)
            logs = Messages.objects.filter(Q(profile = userInstance, sender = friendInstance)|
                                           Q(profile = friendInstance, sender = userInstance))
            res = []
            for m in logs:
                res.append([m.messages, m.sender.user.email, m.profile.user.email])
            self.send(text_data=json.dumps({
                'status': 'getMessage',
                'message': res
            }))
<<<<<<< HEAD
        authorized = ['312baron@gmail.com', 'huangbaron2@gmail.com', 'baronhua@buffalo.edu', 'kjiang1991@gmail.com', 'frankyan@buffalo.edu', 'bcisneros947@gmail.com', 'ahom2@buffalo.edu', 'kenjiang@buffalo.edu']
        if (self.user_email in authorized):
            if data["status"] == 'DELETEALL':
                Messages.objects.all().delete()
                LastSent.objects.all().delete()
                self.send(text_data=json.dumps({
                    'status': 'eradicate',
                }))
            elif data["status"] == "RESETALL":
                Messages.objects.all().delete()
                LastSent.objects.all().delete()
                LocationList.objects.all().delete()
                Location.objects.all().delete()
                Post.objects.all().delete()
                Comment.objects.all().delete()
                Emoji.objects.all().delete()
                User.objects.all().delete()
                Profile.objects.all().delete()
                async_to_sync(self.channel_layer.group_discard)(
                    self.room_group_name,
                    self.channel_name
                )
                self.disconnect()
=======
>>>>>>> 7b4278112ef7964e319c25cc66f3b11801cd726f

    #inwards
    def chat_message(self, event):
        message = event['message']
        senderInstance = Profile.objects.get(pk = self.user_id)
        logs = Messages.objects.filter(profile = senderInstance) #latest(bottom) to oldest
        latest = logs[len(logs) - 1]
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'status': 'updateChat',
            'message': latest.messages,
            'from': latest.sender.user.email,
            'to': latest.profile.user.email
        }))
