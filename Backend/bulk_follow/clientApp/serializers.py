from .models import *
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

# Register Serializer
class PasswordField(serializers.CharField):
    def to_internal_value(self, data):
        return make_password(data)

class RegisterUserSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    password=PasswordField()
    class Meta:
        model=User
        fields='__all__'
        extra_kwargs={
            'password':{'write_only':True}
        }



# Login Serialzier
class LoginUserSerialzier(serializers.ModelSerializer):
    email=serializers.EmailField()
    class Meta:
        model=User
        fields=['email' , 'password']



# User Account 
class UserAccountSerializer(serializers.Serializer):
    id=serializers.IntegerField()
    email=serializers.EmailField()
    username=serializers.CharField()
    balance=serializers.FloatField()
    


# User Balance Serialzier
class UserBalanceSerializer(serializers.Serializer):
    balance=serializers.FloatField()


# Deposit Payment Serializer
class DepositPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model=PaymentDetail
        fields='__all__'


# Place Order
class PlaceTwitchOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=TwitchOrder
        fields='__all__'



# Fetching Payment Details
class PaymentDetailSerializer(serializers.ModelSerializer):
    created=models.DateTimeField()
    class Meta:
        model=PaymentDetail
        fields='__all__'



# Fetching Order History
class OrderHistorySerializer(serializers.ModelSerializer):
    created=models.DateTimeField()
    class Meta:
        model=TwitchOrder
        exclude=['apiOrderId' ,'viewsDone' , 'isJoinDelay' , 'formalCharge' , 'profit']



# User Support Serializer
class UserSupportSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserSupport
        fields='__all__'