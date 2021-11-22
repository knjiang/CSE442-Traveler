from django.urls import path

from .views import CreateChatView, AddToGroupChatView, GetChatView, DeleteChatView

app_name = "chat"

urlpatterns = [
    path('create_chat/', CreateChatView.as_view()),
    path('add_to_group_chat/', AddToGroupChatView.as_view()),
    path('get_chat/', GetChatView.as_view()),
    path('delete_chat/', DeleteChatView.as_view())
]