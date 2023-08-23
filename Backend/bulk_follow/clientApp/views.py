from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .token import get_tokens_for_user
from rest_framework.views import APIView 
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
import string
import secrets
from django.conf import settings
import stripe
import uuid
from .sendEmail import sendMail
import random
from django.forms.models import model_to_dict

# Create your views here.


# Sending Token and Login Response
def AuthResponse(user):
    token=get_tokens_for_user(user=user)
    data={
        'access_token':token['access'],
        'refresh_token':token['refresh'],
        'username':user.username,
        'user_id':user.id,
        'email':user.email,
        'userRole':user.userRole,
    }
    return data


# Register View
class RegisterUserView(APIView):
    def post(self , request , format=None):
        data=request.data['data']
        
        if User.objects.filter(email=data['email']).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer=RegisterUserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        data=AuthResponse(user=user)
        return Response(data , status=status.HTTP_201_CREATED)



# Login View
class LoginUserView(APIView):
    def post(self , request , format=None):
        data=request.data['data']
        serializer=LoginUserSerialzier(data=data)
        serializer.is_valid(raise_exception=True)
        user=authenticate(email=data['email'] , password=data['password'])
        if user is not None:
            data=AuthResponse(user=user)
            return Response(data , status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


# UserAccount View
class UserAccountView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self , request , format=None):
        user=User.objects.get(id=request.user.id)
        serializer=UserAccountSerializer(data=model_to_dict(user))
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data  ,  status=status.HTTP_200_OK)  



# Edit Profile
class EditProfileView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self , request , format=None):
        userData=request.user
        data=request.data['data']
        user=authenticate(email=userData.email , password=data['password'])
        # If Password is right
        if user is not None:

            # Updating Email
            if 'email' in  data:
                # Checking if email already exists
                if not User.objects.filter(email=data['email']).exists():
                    user.email=data['email']
                    user.save()
                    return Response({'email':user.email},status=status.HTTP_201_CREATED)
                else:
                    return Response( status=status.HTTP_409_CONFLICT)

            # Updating Username
            elif 'username' in data:
                # Checking if username already exists
                if not User.objects.filter(username=data['username']).exists():
                    user.username=data['username']
                    user.save()
                    return Response({'username':user.username},status=status.HTTP_201_CREATED)
                else:
                    return Response(status=status.HTTP_409_CONFLICT)

        #If Password is wrong
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)   



# Updating Password
class ChangePasswordView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def post (self , request , format=None):
        userData=request.user
        data=request.data['data']
        user=authenticate(email=userData.email , password=data['password'])
        # If password is right
        if user is not None:
            user.set_password(data['newPassword'])
            user.save()
            return Response(status=status.HTTP_200_OK)
        # if password is wrong
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


# Fetching Balance
class UserBalanceView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self , request , format=None):
        user=request.user
        serializer=UserBalanceSerializer(data={'balance':user.balance})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data ,status=status.HTTP_200_OK)



#  Checking User Auth status
class CheckingUserAuthView(APIView):
    def post(self , request , format=None):
        email=request.data['email']
        # email=data['email']

        # Case 1:  User alreddy exist
        if User.objects.filter(email=email).exists():
            return Response(status=status.HTTP_200_OK)

        # Case 2:  User does not  exist
        else:
            # generating Username
            randomDigits=random.randint(1 , 9999)
            username='User'+str(randomDigits)
            #Gererting password
            alphabet=string.ascii_letters + string.digits + string.punctuation
            password=''.join(secrets.choice(alphabet) for i in range(16))
            serializer=RegisterUserSerializer(data={'email':email , 'password':password , 'username':username})
            serializer.is_valid(raise_exception=True)
            user=serializer.save()
            sendMail(
                'Account Password' , 
                f'Hello {user.username}! Following is your account password please do not share it with anybody: {password} ' , 
                user.email
            )
            data=AuthResponse(user=user)
            return Response(data=data , status=status.HTTP_201_CREATED)





# CreatePayment
class CreatePaymentIntentView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self , request , format=None):
        
        try:
            stripe.api_key=settings.STRIPE_SECRET_KEY
            data=request.data['data']
            intent=stripe.PaymentIntent.create(
                amount= int(float(data['totalAmount']) * 100),
                currency='usd',
                automatic_payment_methods={
                    'enabled': True,
                },            
            )
            response={
                'clientSecret':intent['client_secret']
            }
            
            return Response(response , status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)




# Depositing Money
class DepositPaymentView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self , request , format=None):
        user=request.user
        data=request.data['data']
        data['user']=user.id
        serializer=DepositPaymentSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        paymentInstance=serializer.save()
        user.balance=round(float(user.balance)+float(paymentInstance.amount) , 2)
        user.save()
        return Response (status=status.HTTP_200_OK)




# Placong Order
class PlaceOrderView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self , request , format=None):
        data=request.data['data']
        user=request.user
        totalCharge=float(data['totalCharge'])
        
        # Insufficient Balance
        if totalCharge > user.balance:
            required_amount=round(totalCharge-user.balance , 2)
            return Response({'required_amount':required_amount} ,status=status.HTTP_402_PAYMENT_REQUIRED)

        # Sufficient Balance
        else:
            # Calculating formal charge and profit
            formalCharge=round( (float(data['no_of_views'])/1000.0)*4 , 2)
            profit=round(float(data['totalCharge'])-formalCharge , 2) 
            data['formalCharge']=formalCharge
            data['profit']=profit
            data['user']=user.id
            data['orderId']=uuid.uuid4().hex[:15]
            data['isJoinDelay']=True if data['joinDelay']!=0 else False
            if data['category']=='twitch':
                serializer=PlaceTwitchOrderSerializer(data=data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                user.balance=round(user.balance-totalCharge , 2) 
                user.save()
            
            return Response(status=status.HTTP_200_OK)


# Fetching Payment Details
class PaymentDetailView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=PaymentDetail.objects.all()
    serializer_class=PaymentDetailSerializer
    
    def get_queryset(self):
        user=self.request.user
        return PaymentDetail.objects.filter(user=user).order_by('-created')



# Fetching Order History
class OrderHistoryView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=TwitchOrder.objects.all()
    serializer_class=OrderHistorySerializer

    def get_queryset(self):
        user=self.request.user
        return TwitchOrder.objects.filter(user=user).order_by('-created')

    # For adding Index

    def get_serializer(self, *args, **kwargs):
        serializer = super().get_serializer(*args, **kwargs)
        for i, obj in enumerate(serializer.data, start=1):    
            obj["index"] = i
        return serializer



# User Support
class UserSupportView(APIView):
    def post(self, request , format=None):
        data=request.data['data']
        serializer=UserSupportSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)






