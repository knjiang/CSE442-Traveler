from django.urls import path

from .views import CreateGroupChatView, AddToGroupChatView

app_name = "chat"

urlpatterns = [
    path('create_group_chat/', CreateGroupChatView.as_view()),
    path('add_to_group_chat/', AddToGroupChatView.as_view())
]