from django.urls import path
from .views import *
# from .tasks import TwitchApiTask



urlpatterns = [
    path('api/loginAdmin/' , LoginAdminUserView.as_view() , name='loginAdmin'),
    path('api/twitchOrders/' , TwitchOrdersView.as_view() , name='twitch-orders'),
    path('api/twitchUpdateOrder/<int:pk>/' , TwitchUpdateOrderView.as_view() , name='twitchUpdateOrder'),

    path('api/transactionList/' , TransactionListView.as_view() , name='transactionList'),
    path('api/userSupportList/' , UserSupportListView.as_view() , name='userSupportList'),


]




