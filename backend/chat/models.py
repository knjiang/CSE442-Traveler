from django.db import models
from django.contrib.auth.models import User
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


'''
class LastSent(models.Model):
    user_1 = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name = 'user_1')
    user_2 = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name = 'user_2')
    messages = models.TextField(max_length=60,default="")
    creationDate = models.DateTimeField(auto_now_add = True, auto_now = False)

    def __str__(self):
        return '{} and {}'.format(self.user_1.user.email, self.user_2.user.email)

    class Meta:
        ordering = ('creationDate',) 
    # [(ken, message, tiemstamp),(baron, message, tiemstamp) ].sort(timestamp)

class GroupChatMessages(models.Model):
    sender = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name = 'gc_message_sender')
    messages = models.TextField(max_length=60,default="")
    creationDate = models.DateTimeField(auto_now_add = True, auto_now = False)

    def __str__(self):
        return '{}, from {}, to {}'.format(self.messages, self.profile.user.email, self.sender.user.email)

    class Meta:
        ordering = ('creationDate',) 

class GroupChat(models.Model):
    users = models.ManyToManyField(Profile) 
    name = models.TextField(max_length=60,default="")
    messages = models.ForeignKey(GroupChatMessages,on_delete=models.CASCADE, related_name = 'gc_message', null=True)
    lastSent = models.OneToOneField(GroupChatMessages,on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return 'id = {}, {}'.format(self.pk, self.users)


'''

