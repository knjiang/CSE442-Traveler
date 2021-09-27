from django.test import TestCase
from django.test import Client
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from django.contrib.auth.models import User
from .models import Profile
from .views import SearchUserView
import json
from rest_framework import status

# Create your tests here.
class SearchUserTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = SearchUserView.as_view()
        user = User.objects.create_user(username='testuser', first_name='testuser', email='testuser@gmail.com')

    def test_user_search(self):
        """Testing GET requests for searching users in profile model"""
        # Initial Profile
        user = User.objects.get(username='testuser')
        profile = Profile.objects.get(user__username='testuser')
        self.assertEqual(profile.user.username, 'testuser')
        self.assertEqual(profile.user.email, 'testuser@gmail.com')

        # # Search for testuser
        response = self.client.get('/api/profiles/search_user/', {'user_email':'testuser@gmail.com'})
        self.assertTrue(status.is_success(response.status_code))
        data = json.loads(response.content)
        self.assertEqual(data['first_name'], 'testuser')
        self.assertEqual(data['email'], 'testuser@gmail.com')
        profile = Profile.objects.get(user__username='testuser')
        self.assertEqual(profile.user.username, 'testuser')
        self.assertEqual(profile.user.email, 'testuser@gmail.com')