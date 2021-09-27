from django.db import models
from backend.profiles.models import Profile

# Create your models here.
class Forum(models.Model):
    name = models.TextField(max_length=20)

class Post(models.Model):
    title = models.TextField(max_length=20)
    body = models.TextField(max_length=50)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

class Comment(models.Model):
    body = models.TextField(max_length=50)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
