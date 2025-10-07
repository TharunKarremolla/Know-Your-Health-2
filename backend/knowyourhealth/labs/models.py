from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Lab(models.Model):
    name = models.CharField(max_length =100,blank = False)
    address = models.CharField(max_length= 100 , blank = False)


class Appointment(models.Model):
    patient = models.ForeignKey(User,on_delete = models.CASCADE, related_name='appointments'    )
    time = models.DateTimeField(auto_now_add = True)
    lab = models.ForeignKey(Lab,on_delete=models.CASCADE, related_name='appointments')
    appointment_time = models.DateTimeField()