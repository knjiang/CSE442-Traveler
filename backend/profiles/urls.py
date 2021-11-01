from django.urls import path

from .views import (
AddDescriptionView,
DelDescriptionView,
EditDescriptionView,
ChangeVisitedView,
GetProfileView, 
ChangeLocationView, 
SearchUserView, 
AddListView, 
DeleteListView, 
AddLocationListView,
AddLocationView,
DelLocationView,
DeleteLocationListView, 
GetAllProfilesView, 
GetUserListsView, 
GetListDataView, 
GetSetShareableLink,
GetShareableLinkList,
ChangeBackgroundView,
ChangeVisitedView,
)

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
    path('get_list_data/', GetListDataView.as_view()),
    path('add_location/', AddLocationView.as_view()),
    path('del_location/', DelLocationView.as_view()),
    path('change_background/', ChangeBackgroundView.as_view()),
    path('change_visited/', ChangeVisitedView.as_view()),
    path('shareable_link/',GetSetShareableLink.as_view()),
    path('get_shareable_contents/', GetShareableLinkList.as_view()),
    path('add_description/', AddDescriptionView.as_view()),
    path('del_description/', DelDescriptionView.as_view()),
    path('edit_description/', EditDescriptionView.as_view()),
]