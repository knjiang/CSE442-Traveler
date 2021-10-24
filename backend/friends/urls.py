from django.urls import path

from .views import (
    GetFriendRequestsView,
    GetFriendsView,
    SendRequestView,
    AcceptRequestView,
    DeleteRequestView,
    DeleteFriendView
)

app_name = "friends"

urlpatterns = [
    path('get_friend_requests/', GetFriendRequestsView.as_view()),
    path('get_friends/', GetFriendsView.as_view()),
    path('send_request/', SendRequestView.as_view()),
    path('accept_request/', AcceptRequestView.as_view()),
    path('delete_request/', DeleteRequestView.as_view()),
    path('delete_friend/', DeleteFriendView.as_view()),
]

