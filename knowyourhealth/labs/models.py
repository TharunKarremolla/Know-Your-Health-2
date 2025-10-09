from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Labs(models.Model):
    name = models.CharField(max_length =100,blank = False)
    address = models.CharField(max_length= 100 , blank = False)



class Appointments(models.Model):
    patient = models.ForeignKey(User,on_delete=models.CASCADE,related_name='appointment')
    lab = models.ForeignKey(Labs,on_delete=models.CASCADE,related_name='appointment')
    time = models.DateTimeField(auto_now_add=True)
    appointment_at = models.DateTimeField()