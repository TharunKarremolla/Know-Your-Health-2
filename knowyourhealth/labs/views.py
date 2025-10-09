from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt
from .models import Labs,Appointments
from .serializers import LabSerializer,AppSerializer,AppointmentSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
# Create your views here.

@api_view(['POST'])
def appointments(request):
    serializer = AppointmentSerializer(data = request.data)
    print(serializer)
    if serializer.is_valid():
        patient = serializer.validated_data['patient']
        lab = serializer.validated_data['lab']
        from_email = "nandu77319@gmail.com"
        recipient_list = ["karremollatharun@gmail.com"]
        subject = "Scheduling Appointments"
        message = f"Your appointment is scheduled at {serializer.validated_data['appointment_at']}"
        print(patient.email)
        send_mail(subject,message,from_email,recipient_list)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@login_required
@api_view(['GET','POST'])
def my_appoints(request):
    
    if request.method == 'GET':
        appointments = Appointments.objects.select_related('lab','patient').all()
        result = []
        for a in appointments:
           
            result.append({
                'Lab Name' : a.lab.name,
                'Appointment time' : a.time,
                'patient Name' : a.patient.username,
                'Address' : a.lab.address

            })
           
        return Response(result)
        
        
    
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
def labs(request,pk = None):
   
    if request.method == 'GET':
        
        try:
            labs = Labs.objects.all()
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

@api_view(['GET','PUT','PATCH','DELETE'])    
def update_lab(request,id):
        lab = get_object_or_404(Labs,id = id )

        if request.method == 'GET':
            serializer = LabSerializer(lab)
            return Response(serializer.data)
            
        elif request.method == 'PUT':
            print(request.data)
            serializer = LabSerializer(lab,data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'PATCH':
            serializer = LabSerializer(lab,data = request.data,partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)   


        elif request.method == 'DELETE':
            lab = get_object_or_404(Labs,id = id)
        
            lab.delete()
            return Response({'message' : 'deleted'})
      

