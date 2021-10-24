from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication

from profiles.models import Profile, Location
from .models import Post,Comment, Emoji, OriginEmoji
from django.contrib.auth.models import User

import json
import uuid

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
        
        title = request.data['title']
        body = request.data['body']
        location_name = request.data['location']

        locationObject = Location.objects.get(name = location_name)

        if locationObject:
            Post.objects.create(title=title, body=body, profile=profile, location = locationObject)

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
        post = Post.objects.get(id=request.data['postID'])
        body = request.data['body']
        comment = Comment(post=post,body=body,profile=profile,comment_id=uuid.uuid4())
        comment.save()
        return Response()

class GetCommentFromPostView(APIView):
    """
    View to add comment

    * Requires token authentication.
    """
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        """
        Adds a comment to a post
        """
        post_id = request.query_params.get('post_id')
        post = Post.objects.get(id=post_id)
        all_comments = Comment.objects.filter(post_id=post_id)
        res = []
        for comment in all_comments:
            if not comment.comment_id:
                comment.comment_id = uuid.uuid4()
                comment.save()
            res.append({
                "comment_id": comment.comment_id,
                "body": comment.body,
                "user":  comment.profile.user.username,
                "emoji_list" : list(comment.emoji_set.all())
            })
        return Response(res)

class GetPostFromLocationView(APIView):
    """
    View to get all posts 
    """
    def get(self, request, format=None):
        """
        Get all posts 
        """
        location_name = request.query_params.get('location')
        locationObject = Location.objects.get(name = location_name).id
        all_posts = Post.objects.filter(location = locationObject)
        res = {}
        for p in all_posts:
            res[p.id] = [p.title, p.body, p.location.name, p.profile.user.username, p.id]
        return Response(res)

class GetPostView(APIView):
    '''
        View to get all posts tied with user
    '''
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        """
        Adds a comment to a post
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        post = Post.objects.filter(profile = request.user.id)
        res = []
        for p in post:
            res.append([p.id, p.title, p.body, p.location.name, p.profile.user.username])
        return Response(res)

class GetCommentView(APIView):
    '''
        View to get all posts tied with user
    '''
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        """
        Adds a comment to a post
        """
        profile = get_object_or_404(Profile,pk=request.user.id)
        comment = Comment.objects.filter(profile = request.user.id)
        res = []
        for p in comment:
            res.append([p.id, p.body, p.profile.user.username])
        return Response(res)

class DeletePostView(APIView): 
    '''
        View to delete post tied with user
    '''
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        post = request.data["postID"]
        Post.objects.get(id = post).delete()

        profile = get_object_or_404(Profile,pk=request.user.id)
        post = Post.objects.filter(profile = request.user.id)
        resP = []
        for p in post:
            resP.append([p.id, p.title, p.body, p.location.name, p.profile.user.username])

        comment = Comment.objects.filter(profile = request.user.id)
        resC = []
        for c in comment:
            resC.append([c.id, c.body, c.profile.user.username])

        return Response([resP, resC])


class DeleteCommentView(APIView): 
    '''
        View to delete comment tied with user
    '''
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        comment = request.data["commentID"]
        Comment.objects.get(id = comment).delete()

        profile = get_object_or_404(Profile,pk=request.user.id)
        comment = Comment.objects.filter(profile = request.user.id)
        res = []
        for p in comment:
            res.append([p.id, p.body, p.profile.user.username])
        return Response(res)

class AddAdminEmojiView(APIView):
    """
        View to add global emojis to the website
    """
    authentication_classes = [authentication.TokenAuthentication]
    
    def post(self, request, format=None):
        emoji_name = request.data["emoji_name"]
        if not OriginEmoji.objects.filter(name=emoji_name).exists():
            OriginEmoji.objects.create(name=emoji_name)
        return Response()

class AddEmojiToComment(APIView):
    """
        View to add an emoji to a commment
    """
    authentication_classes = [authentication.TokenAuthentication]
    
    def post(self, request, format=None):
        comment_id = request.data['comment_id']
        comment = get_object_or_404(Comment,comment_id=comment_id)
        emoji_name = request.data['emoji_name']
        origin_emoji = get_object_or_404(OriginEmoji,name=emoji_name)
        if not Emoji.objects.filter(comment=comment,name=origin_emoji).exist():
            Emoji.objects.create(comment=comment,name=origin_emoji)
        return Response()
