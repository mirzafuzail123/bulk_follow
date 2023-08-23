from django.urls import path
from .views import *

urlpatterns = [
    path('api/register/' , RegisterUserView.as_view() , name='register'),
    path('api/login/' , LoginUserView.as_view() , name='login'),

    path('api/userBalance/' , UserBalanceView.as_view() , name='userBalance'),
    path('api/userAccount/' , UserAccountView.as_view() , name='userAccount'),
    path('api/editProfile/' , EditProfileView.as_view() , name='editProfile'),
    path('api/changePassword/' , ChangePasswordView.as_view() , name='changePassword'),
    path('api/userSupport/' , UserSupportView.as_view() , name='userSupport'),

    path('api/checkUserAuth/' , CheckingUserAuthView.as_view() , name='checkUserAuth'),
    path('api/placeOrder/' , PlaceOrderView.as_view() , name='placeOrder'),
    path('api/createPaymentIntent/' , CreatePaymentIntentView.as_view() , name='createPaymentIntent'),
    path('api/depositPayment/' , DepositPaymentView.as_view() , name='depositPayment'),

    path('api/paymentDetail/' , PaymentDetailView.as_view() , name='paymentDetail'),

    path('api/orderHistory/' , OrderHistoryView.as_view() , name='orderHistory'),


]
