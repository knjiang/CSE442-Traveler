from django.urls import path
from .views import AddForumView,AddCommentView,AddPostView,GetPostViews 

app_name = "forums"

urlpatterns = [
    path('add_forum/', AddForumView.as_view()),
    path('add_comment/', AddCommentView.as_view()),
    path('add_post/', AddPostView.as_view()),
    path('get_posts/', GetPostViews.as_view()),
]