from django.db import models
from django.contrib.auth.models import GroupManager, User
from django.db.models.signals import post_save
from django.dispatch import receiver
from profiles.models import Profile
from django.utils import timezone

class Messages(models.Model):
    sender = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name = 'message_sender')
    messages = models.TextField(max_length=60,default="")
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name = 'message_receiver')
    creationDate = models.DateTimeField(auto_now_add = True, auto_now = False)

    def __str__(self):
        return '{}, from {}, to {}'.format(self.messages, self.profile.user.email, self.sender.user.email)

    class Meta:
        ordering = ('creationDate',) 
    # [(ken, message, tiemstamp),(baron, message, tiemstamp) ].sort(timestamp)


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

    def __str__(self):
        return '{}'.format(self.users)

class LastSentGroup(models.Model):
    group = models.OneToOneField(GroupChat, on_delete=models.CASCADE)
    messages = models.TextField(max_length=60,default="")
    creationDate = models.DateTimeField(auto_now_add = True, auto_now = False)

    def __str__(self):
        return '{} and {}'.format(self.group.id)

    class Meta:
        ordering = ('creationDate',) 