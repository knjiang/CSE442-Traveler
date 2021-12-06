from django.urls import path

from .views import CreateChatView, AddToGroupChatView, GetChatView, DeleteChatView, GetRecentChatView, RenameChatView, RemoveFromGroupChatView, GetRecentChatView

app_name = "chat"

urlpatterns = [
    path('create_chat/', CreateChatView.as_view()),
    path('add_to_group_chat/', AddToGroupChatView.as_view()),
    path('get_chat/', GetChatView.as_view()),
    path('delete_chat/', DeleteChatView.as_view()),
    path('rename_chat/', RenameChatView.as_view()),
    path('remove_from_group_chat/', RemoveFromGroupChatView.as_view()),
    path('get_recent_chat/', GetRecentChatView.as_view())
]