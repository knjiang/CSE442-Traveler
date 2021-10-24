from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication
from .models import Friend, FriendRequest
from profiles.models import Profile

# Create your views here.

class GetFriendRequestsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        profile = get_object_or_404(Profile,pk=request.user.id)
        received_requests = [requester.user.email for requester in FriendRequest.objects.filter(person=profile)]
        return Response({
            "requests_list" : received_requests
        })

class GetFriendsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        profile = get_object_or_404(Profile,pk=request.user.id)
        my_friends = [friend.user.email for friend in Friend.objects.filter(user=profile)]
        return Response({
            "friends_list" : my_friends
        })

class SendRequestView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        my_profile = get_object_or_404(Profile,pk=request.user.id)
        friend_profile = get_object_or_404(Profile,user__email=request.data['friend'])
        if  not (FriendRequest.objects.filter(requester = my_profile, person = friend_profile).exists()):
            FriendRequest.objects.create(requester = my_profile, person = friend_profile)
            return Response({
                "Sent friend request successfully to " + friend_profile.user.email
            })
        else:
            return Response({
                "Unsuccessfully sent friend request successfully to " + friend_profile.user.email
            })

class AcceptRequestView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        my_profile = get_object_or_404(Profile,pk=request.user.id)
        friend_profile = get_object_or_404(Profile,user__email=request.data['friend'])
        request_exists = FriendRequest.objects.filter(requester = my_profile, person = friend_profile).exists()
        friend_relation_exists = Friend.objects.filter(user = my_profile, friend = friend_profile).exists()
        if request_exists and not (friend_relation_exists):
            Friend.objects.create(user = my_profile, friend = friend_profile)
            FriendRequest.objects.filter(requester = my_profile, person = friend_profile).delete()
            return Response({
                "status":"Accepted request from " + friend_profile.user.email
            })
        else:
            return Response({
                "status":"Error for accepting request from " + friend_profile.user.email
            })

class DeleteRequestView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        my_profile = get_object_or_404(Profile,pk=request.user.id)
        friend_profile = get_object_or_404(Profile,user__email=request.data['friend'])
        request_exists = FriendRequest.objects.filter(requester = my_profile, person = friend_profile).exists()
        if request_exists:
            FriendRequest.objects.filter(requester = my_profile, person = friend_profile).delete()
            return Response({
                "status":"Deleted request from " + friend_profile.user.email
            })
        else:
            return Response({
                "status":"Error for deleting request from " + friend_profile.user.email
            })

class DeleteFriendView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        my_profile = get_object_or_404(Profile,pk=request.user.id)
        friend_profile = get_object_or_404(Profile,user__email=request.data['friend'])
        friend_relation_exists = Friend.objects.filter(user = my_profile, friend = friend_profile).exists()
        if friend_relation_exists:
            Friend.objects.filter(user = my_profile, friend = friend_profile).delete()
            return Response({
                "status":"Deleted " + friend_profile.user.email + " from friends list"
            })
        else:
            return Response({
                "status":"Error for deleting " + friend_profile.user.email + " from friend"
            })


