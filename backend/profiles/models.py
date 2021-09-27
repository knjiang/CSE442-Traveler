from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    from_location = models.TextField(max_length=30,default="")

    def __str__(self):
        return self.user.username

class Language(models.Model):
    name = models.TextField(max_length=30)
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class LocationList(models.Model):
    name = models.TextField(max_length=30)
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Location(models.Model):
    name = models.TextField(max_length=30)

    def __str__(self):
        return self.name

class SavedLocation(models.Model):
    name = models.OneToOneField(Location, on_delete=models.CASCADE)
    list = models.ForeignKey(LocationList,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()