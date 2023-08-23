from rest_framework import serializers
from clientApp.models import *


# Login Serializer
class LoginAdminUserSerializer(serializers.Serializer):
    email=serializers.EmailField()
    class Meta:
        model=User
        fields='__all__'


class TwitchOrderSerializer(serializers.ModelSerializer):
    created=serializers.DateTimeField()
    class Meta:
        model=TwitchOrder
        fields='__all__'



# Transactions Serializer
class TransactionListSerializer(serializers.ModelSerializer):
    user=serializers.SlugRelatedField(queryset=User.objects.all() , slug_field='email')
    created=models.DateTimeField()
    class Meta:
        model=PaymentDetail
        fields='__all__'



# User Suport
class UserSupportSerializer(serializers.ModelSerializer):
    created=models.DateTimeField()
    class Meta:
        model=UserSupport
        fields="__all__"
