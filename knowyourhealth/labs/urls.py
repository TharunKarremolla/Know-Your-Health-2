from django.urls import path,include
from .views import index,labs,send_message,appointments,my_appoints,update_lab

urlpatterns = [
    path('',index,name='index'),
    path('labs/',labs),
    path('labs/<int:id>',update_lab),
    path('send_message/',send_message),
    path('appointments/',appointments),
     path('my_appoints/',my_appoints)
]
