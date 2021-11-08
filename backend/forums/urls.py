from django.urls import path
from .views import (
    AddCommentView,
    AddPostView, 
    GetCommentFromPostView, 
    GetCommentView,
    GetPostFromLocationView, 
    GetPostView, 
    DeletePostView, 
    DeleteCommentView,
    AddEmojiToComment
)

app_name = "forums"

urlpatterns = [
    path('add_comment/', AddCommentView.as_view()),
    path('add_post/', AddPostView.as_view()),
    path('get_post_by_location/', GetPostFromLocationView.as_view()),
    path('get_comment_from_post/', GetCommentFromPostView.as_view()),
    path('get_post/', GetPostView.as_view()),
    path('get_comment/', GetCommentView.as_view()),
    path('del_post/', DeletePostView.as_view()),
    path('del_comment/', DeleteCommentView.as_view()),
    path('add_emoji_to_comment/', AddEmojiToComment.as_view())
]