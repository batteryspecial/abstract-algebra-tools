from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='complex-home'),
]