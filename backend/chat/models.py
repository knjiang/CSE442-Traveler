from django.db import models
from django.contrib.auth.models import GroupManager, User
from django.db.models.signals import post_save
from django.dispatch import receiver
from profiles.models import Profile
from django.utils import timezone


class Chat(models.Model):
    users = models.ManyToManyField(Profile) 
    updated = models.DateTimeField(auto_now = True)
    type = models.TextField(max_length = 10)
    name = models.TextField(max_length = 100)
    nameChanged = models.BooleanField(default = False)
    def __str__(self):
        return 'Chat with users: {}'.format(self.users.all())

    class Meta:
        ordering = ('-updated',) 

class Messages(models.Model):
    sender = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name = 'message_sender')
    message = models.TextField(max_length=60,default="")
    creationDate = models.DateTimeField(auto_now_add = True, auto_now = False)
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE, related_name = 'chatLog', null=True)

    def __str__(self):
        return '{}, from {}'.format(self.message, self.sender.user.email)

    class Meta:
        ordering = ('creationDate',) 
    # [(ken, message, tiemstamp),(baron, message, tiemstamp) ].sort(timestamp)