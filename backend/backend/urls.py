"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework import routers
from profiles.viewsets import ProfileViewSet,LanguageViewSet,LocationViewSet
from .viewsets import UserViewSet
from login.views import GoogleLogin

router = routers.DefaultRouter()
router.register(r'profiles', ProfileViewSet)
router.register(r'languages', LanguageViewSet)
router.register(r'users', UserViewSet)
router.register(r'locations', LocationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
<<<<<<< HEAD
    path('api/profiles/', include('profiles.urls'))
=======
>>>>>>> 3e1f2d283607283cee1a972783b8d0f9bc999b5a
]
