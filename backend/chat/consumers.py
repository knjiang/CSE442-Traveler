import json
from channels.generic.websocket import WebsocketConsumer
from rest_framework.authtoken.models import Token
from asgiref.sync import async_to_sync
from django.contrib.auth.models import Group, User
from .models import Messages, LastSent
from profiles.models import Profile
from django.db.models import Q

class ChatConsumer(WebsocketConsumer):

    def connect(self):
        protocol = self.scope['subprotocols']
        if protocol:
            self.accept()
            print("Connected to websocket")
            token = protocol[0]
            self.user_id = Token.objects.get(key=token).user.id
            self.user_email = Token.objects.get(key=token).user.email
            self.room_group_name = 'room-{}'.format(self.user_id)
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            print("User {} has joined {}".format(Token.objects.get(key=token).user.email, self.room_group_name))
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
            print(lastSent)

            self.send(text_data=json.dumps({
                'status': 'updateConnected',
                'users': res,
                'lastSent': lastSent
            }))
        else:
            print("Unauthorized User")


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
            print("Sending message of {} to user {} from user {}".format(message, self.receiver_id, self.user_id))
            self.send(text_data=json.dumps({
                'status': 'updateChat',
                'message': message,
                'from': self.user_email,
                'to': User.objects.get(email__exact=receiver).email
            }))
        elif data["status"] == "get":
            print("Getting messages from specified user", data["user"])
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
        elif data["status"] == 'DELETEALL':
            Messages.objects.all().delete()
            LastSent.objects.all().delete()
            self.send(text_data=json.dumps({
                'status': 'eradicate',
            }))

    #inwards
    def chat_message(self, event):
        message = event['message']
        senderInstance = Profile.objects.get(pk = self.user_id)
        logs = Messages.objects.filter(profile = senderInstance) #latest(bottom) to oldest
        latest = logs[len(logs) - 1]
        print("Received message of {} to user {} from user {}".format(latest.messages, latest.profile.user.email, latest.sender.user.email))
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'status': 'updateChat',
            'message': latest.messages,
            'from': latest.sender.user.email,
            'to': latest.profile.user.email
        }))
