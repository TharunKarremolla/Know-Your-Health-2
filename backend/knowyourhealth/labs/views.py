from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt
from .models import Lab,Appointment
from .serializers import LabSerializer,AppSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.decorators import login_required
# Create your views here.

@login_required
@api_view(['GET','POST'])
def fetch_appoints(request):
    if request.method == 'GET':
        appointments = Appointment.objects.all()
        serializer = AppSerializer(appointments,many=True)
        return Response(serializer.data)
    
    else:
        serializer = AppSerializer(data = request.data)       
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message' : 'scheduled'})
        
        return HttpResponse("Error occured invalid data",status=status.HTTP_400_BAD_REQUEST)



@login_required
@api_view(["POST"])
def send_message(request):
    subject = request.data.get("subject", "")
    message = request.data.get("message", "")
    to_email = request.data.get("email")

    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,    # from_email goes here as 3rd positional arg
        [to_email],                  # recipient_list
        fail_silently=False,
    )

    return Response({"status": "Email sent"})

def index(request):
    return HttpResponse('Welcome to KnowYourHealth!!')

@login_required
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def labs(request):
    print(request.user)
    if request.method == 'GET':
        
        try:
            labs = Lab.objects.all()
            serializer = LabSerializer(labs,many=True)
            return Response(serializer.data)
        except :
          
            return HttpResponse('Error')
        
    elif request.method == 'POST':
        
        serializer = LabSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)


