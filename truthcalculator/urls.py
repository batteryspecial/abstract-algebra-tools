from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='truth-home'),
    path('calculate/', views.calculate, name='truth-calc'),
]
