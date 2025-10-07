from django.urls import path,include
from .views import index,labs,send_message,fetch_appoints

urlpatterns = [
    path('',index,name='index'),
    path('labs/',labs),
    path('send_message/',send_message),
    path('appointments/',fetch_appoints)
]
