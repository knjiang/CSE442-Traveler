from django.db import models
from profiles.models import Profile, Location
import uuid

# Create your models here.
class Forum(models.Model):
    name = models.TextField(max_length=20)

class Post(models.Model):
    title = models.TextField(max_length=20)
    body = models.TextField(max_length=50)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    def __str__(self):
        return '{}, {}, {}'.format(self.title, self.body, self.location)

class Comment(models.Model):
    body = models.TextField(max_length=50)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    comment_id = models.UUIDField(editable = True)
    
class Emoji(models.Model):
    name = models.TextField(max_length=50)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

class Tag(models.Model):
    tagged = models.ForeignKey(Profile, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
