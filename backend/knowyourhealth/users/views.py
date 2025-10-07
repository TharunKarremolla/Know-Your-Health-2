from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
import json
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
# Create your views here.


@api_view(['POST'])    
def RegisterView(request):
    print(request.body.decode())
    serializer =  UserSerializer(data = request.data)
    if serializer.is_valid():
        
        serializer.save()
        return Response(serializer.data['username'], status = status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def LoginView(request):
    username = request.data.get('Mobile')
    password = request.data.get('password')
    user = authenticate(username = username,password = password)
    print('login : ',user)
    if user:
        login(request,user)   
        return Response({'user' : user.username},status = status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def current_user(request):
    return Response({'user': request.user.username},status = status.HTTP_200_OK)

@api_view(['POST'])
def logoutView(request):
    
    logout(request)
    return Response({'message': 'logged Out!'},status =status.HTTP_200_OK)

@ensure_csrf_cookie
def set_csrf(request):
    return JsonResponse({'message':'csrf token set'})