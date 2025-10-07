from rest_framework import serializers
from .models import Lab,Appointment

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = '__all__'


class AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'        