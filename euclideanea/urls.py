from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='euclid-home'),
    path('calculate/', views.calculate, name='euclid-calc'),
]