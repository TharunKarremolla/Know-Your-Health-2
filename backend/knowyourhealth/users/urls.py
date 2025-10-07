from django.urls import path,include
from .views import RegisterView,LoginView,current_user,logoutView,set_csrf

urlpatterns = [
    path('register/',RegisterView, name = 'register'),
    path('login/',LoginView,name='login'),
    path('',current_user,name='user'),
    path('logout/',logoutView,name='logout'),
    path('csrf/',set_csrf)
    
]
