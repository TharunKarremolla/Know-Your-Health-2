from rest_framework import serializers
from .models import Labs,Appointments
from django.contrib.auth.models import User

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labs
        fields = '__all__'


class AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = '__all__'        

class AppointmentSerializer(serializers.ModelSerializer):

    patient_id = serializers.PrimaryKeyRelatedField(source='patient',queryset = User.objects.all())
    patient_email = serializers.EmailField(source = 'patient.email',read_only = True)
    lab = serializers.PrimaryKeyRelatedField(queryset=Labs.objects.all())
    class Meta:
        model =  Appointments
        fields = ['appointment_at','lab','patient_id','patient_email']