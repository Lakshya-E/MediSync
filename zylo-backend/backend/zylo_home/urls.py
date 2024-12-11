# home/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),  # This maps the home_view to the root URL of this app
]
