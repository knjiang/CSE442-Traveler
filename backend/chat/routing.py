from django.urls import re_path, path

from . import consumers
from .views import CreateGroupChatView


urlpatterns = [
    re_path(r'/', consumers.ChatConsumer.as_asgi()),
    path('create_group_chat/', CreateGroupChatView.as_view())
]