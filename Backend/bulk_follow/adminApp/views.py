from django.shortcuts import render
from rest_framework.generics import ListAPIView , UpdateAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser
from clientApp.views import AuthResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from clientApp.models import *
from .serializers import *
from django.contrib.auth import authenticate
# Create your views here.


# Login
class LoginAdminUserView(APIView):
    def post(self , request , format=None):


        data=request.data['data']   
        serializer=LoginAdminUserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user=authenticate(email=data['email'] , password=data['password'])

        if user is not None and user.is_admin:
            response=AuthResponse(user=user)
            return Response(response ,  status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


# List of Twitch Order
class TwitchOrdersView(ListAPIView):
    queryset=TwitchOrder.objects.all()
    serializer_class=TwitchOrderSerializer
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAdminUser]

    def get_queryset(self):
        return TwitchOrder.objects.all().order_by('-created')



#Updating Twitch Order
class TwitchUpdateOrderView(UpdateAPIView):
    queryset=TwitchOrder.objects.all()
    serializer_class=TwitchOrderSerializer
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAdminUser]




# Transaction Detail
class TransactionListView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAdminUser]
    queryset=PaymentDetail.objects.all()
    serializer_class=TransactionListSerializer

    def get_queryset(self):
        return PaymentDetail.objects.all().order_by('-created')



# Transaction Detail
class UserSupportListView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAdminUser]
    queryset=UserSupport.objects.all()
    serializer_class=UserSupportSerializer

    def get_queryset(self):
        return UserSupport.objects.all().order_by('-created')
