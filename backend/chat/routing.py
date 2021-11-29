from django.urls import re_path, path

from . import consumers



urlpatterns = [
    re_path(r'/', consumers.ChatConsumer.as_asgi()),
]