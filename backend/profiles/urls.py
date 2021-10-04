from django.urls import path

from .views import GetProfileView, ChangeLocationView, ChangeListView, SearchUserView, AddListView

app_name = "profiles"

urlpatterns = [
    path('get_profile/', GetProfileView.as_view()),
    path('change_location/', ChangeLocationView.as_view()),
    path('change_list', ChangeListView.as_view()),
    path('search_user/', SearchUserView.as_view()),
    path('add_list/', AddListView.as_view())
]