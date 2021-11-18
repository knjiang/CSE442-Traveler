from django.db import models
from profiles.models import Profile

# Create your models here.
class Friend(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)
    friend = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return '{} and {}'.format(self.user.user.email, self.friend.user.email)

class FriendRequest(models.Model):
    receiver = models.ForeignKey(Profile,on_delete=models.CASCADE)
    requester = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return '{} and {}'.format(self.receiver.user.email, self.requester.user.email)
