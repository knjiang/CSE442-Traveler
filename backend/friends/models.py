from django.db import models
from profiles.models import Profile

# Create your models here.
class Friend(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)
    friend = models.ForeignKey(Profile,on_delete=models.CASCADE)

class FriendRequest(models.mode):
    person = models.ForeignKey(Profile,on_delete=models.CASCADE)
    requester = models.ForeignKey(Profile,on_delete=models.CASCADE)
