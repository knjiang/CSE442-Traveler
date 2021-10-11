from django.urls import path

from .views import GetProfileView, ChangeLocationView, SearchUserView, AddListView,AddDeleteLocationList, GetAllProfilesView, GetUserListsView

app_name = "profiles"

urlpatterns = [
    path('get_profile/', GetProfileView.as_view()),
    path('change_location/', ChangeLocationView.as_view()),
    path('search_user/', SearchUserView.as_view()),
    path('add_list/', AddListView.as_view()),
    path('add_delete_location_list/', AddDeleteLocationList.as_view()),
    path('search_filter/', GetAllProfilesView.as_view()),
    path('get_lists/', GetUserListsView.as_view())
]