from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication
from .models import Forum,Post,Comment
import json

class AddForumView(APIView):
    """
    View to add forum

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Adds a forum to Forum Model
        """
        new_forum_name = request.data['name']
        forum = Forum(name=new_forum_name)
        forum.save()
        return Response()

class AddPostView(APIView):
    """
    View to add post to a forum

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Adds a post to a forum
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        forum = Forum.objects.get(name=request.data['forum_name'])
        title = request.data['title']
        body = request.data['body']
        post = Post(profile=profile,forum=forum,title=title,body=body)
        post.save()
        return Response()


class AddCommentView(APIView):
    """
    View to add comment

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        """
        Adds a comment to a post
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        post = Post.objects.get(name=request.data['post_name'])
        body = request.data['body']
        comment = comment(post=post,body=body,profile=profile)
        comment.save()
        return Response()

class GetPostViews(APIView):
    """

    View to get all posts 

    """

    def get(self, request, format=None):
        """
        Get all posts 
        """
        all_posts = [post.title for post in Post.objects.all()]
        return Response(
            {
                'posts' : all_posts
            }
        )