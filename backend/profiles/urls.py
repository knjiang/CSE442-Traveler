from django.urls import path

from .views import GetProfileView, ChangeLocationView, ChangeListView

app_name = "profiles"

urlpatterns = [
    path('get_profile/', GetProfileView.as_view()),
    path('change_location/', ChangeLocationView.as_view()),
    path('change_list', ChangeListView.as_view()),
]