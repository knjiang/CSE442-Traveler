from django.urls import path

from .views import GetProfileView, ChangeLocationView, SearchUserView, AddListView, DeleteListView, AddLocationListView, DeleteLocationListView, GetAllProfilesView, GetUserListsView, GetListDataView

app_name = "profiles"

urlpatterns = [
    path('get_profile/', GetProfileView.as_view()),
    path('change_location/', ChangeLocationView.as_view()),
    path('search_user/', SearchUserView.as_view()),
    path('add_list/', AddListView.as_view()),
    path('delete_list/', DeleteListView.as_view()),
    path('add_location_list/', AddLocationListView.as_view()),
    path('delete_location_list/', DeleteLocationListView.as_view()),
    path('search_filter/', GetAllProfilesView.as_view()),
    path('get_lists/', GetUserListsView.as_view()),
    path('get_list_data/', GetListDataView.as_view())
]