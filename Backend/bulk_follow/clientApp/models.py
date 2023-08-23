from django.db import models
from django.contrib.auth.models import  AbstractBaseUser
from .manager import UserManager

UserRole=(
    ('admin' , 'admin'),
    ('client' , 'client')
    )

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    username = models.CharField(max_length=100 , null=True , blank=True)
    balance=models.FloatField(default=0.0)
    userRole=models.CharField(choices=UserRole , default='client' , max_length=50)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username' , 'userRole' , ]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


gatewayChoices=(
    ('stripe' , 'stripe') , 
)

class PaymentDetail(models.Model):
    user=models.ForeignKey(User , on_delete=models.CASCADE)
    depositId=models.CharField(max_length=50 , unique=True , default=1)
    amount=models.FloatField()
    gateway=models.CharField(choices=gatewayChoices , max_length=50)
    created=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email






class TwitchOrder(models.Model):
    user=models.ForeignKey(User , on_delete=models.CASCADE)
    orderId=models.CharField(max_length=20 , unique=True)
    apiOrderId=models.CharField(max_length=100 , default=-1)
    channelName=models.CharField(max_length=150)
    viewsDone=models.BigIntegerField(null=True , blank=True)
    no_of_views=models.BigIntegerField()
    desiredViewersCount=models.BigIntegerField()
    isJoinDelay=models.BooleanField(default=False)
    joinDelay=models.IntegerField()
    totalCharge=models.FloatField()
    formalCharge=models.FloatField(null=True , blank=True)
    profit=models.FloatField(null=True , blank=True)
    status=models.CharField( max_length=50 , default='pending')
    created=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.channelName


class UserSupport(models.Model):
    username=models.CharField(max_length=100)
    email=models.EmailField()
    message=models.TextField()
    created=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


