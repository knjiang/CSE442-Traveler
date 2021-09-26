from django.urls import path

from .views import GetProfileView, ChangeLocationView

app_name = "profiles"

urlpatterns = [
    path('get_profile/', GetProfileView.as_view()),
    path('change_location/', ChangeLocationView.as_view()),
]