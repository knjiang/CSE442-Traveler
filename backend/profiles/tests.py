from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from django.contrib.auth.models import User
from .models import Profile
from .views import ChangeLocationView
import json 
from rest_framework import status

# Create your tests here.
class ChangeLocationTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = ChangeLocationView.as_view()
        user = User.objects.create_user(username='testuser', password='12345')

    def test_location_change(self):
        """Testing POST requests for changing location for profile model"""
        # Initial Profile
        user = User.objects.get(username='testuser')
        profile = Profile.objects.get(user__username='testuser')
        self.assertEqual(profile.user.username, 'testuser')
        self.assertEqual(profile.from_location, '')

        # Change location to United States
        request = self.factory.post('/api/profiles/get_profile/', json.dumps({'location': 'United States'}), content_type='application/json')
        force_authenticate(request, user=user)
        response = self.view(request)
        self.assertTrue(status.is_success(response.status_code))
        profile = Profile.objects.get(user__username='testuser')
        self.assertEqual(profile.user.username, 'testuser')
        self.assertEqual(profile.from_location, 'United States')

        # Change back to empty string 
        request = self.factory.post('/api/profiles/get_profile/', json.dumps({'location': ''}), content_type='application/json')
        force_authenticate(request, user=user)
        response = self.view(request)
        self.assertTrue(status.is_success(response.status_code))
        profile = Profile.objects.get(user__username='testuser')
        self.assertEqual(profile.user.username, 'testuser')
        self.assertEqual(profile.from_location, '')