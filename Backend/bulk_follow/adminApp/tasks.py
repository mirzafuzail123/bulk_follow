from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
import requests
from clientApp.models import TwitchOrder
import json


baseUrl='https://api.reyden-x.com/v1'


# Access Token Request
def AccessTokenRequest():
    
    # Token
    data={
        'username':'info@twitchalps.com' ,
        'password':'h!M)#@u;7xG7Bn<V',
    }
    try:
        response=requests.post(f'{baseUrl}/token/' , data=data)
        json_response=json.loads(response.content)
        return json_response['access_token']
    except:
        raise Exception("ERROR!")   


# Sending APi Request
def APIRequest(orderId):
    orderId='117495'
    token=AccessTokenRequest()
    headers={
        'Authorization':f'bearer {token}'
    }

    try:
        response=requests.get(f'{baseUrl}/orders/{orderId}/' ,  headers=headers)
        json_response=json.loads(response.content)
        return {
            'status': json_response['result']['status'] ,
            'delay_time':json_response['result']['parameters']['delay_time'],
            'views':json_response['result']['statistics']['views'],
            
            }
    except :
        raise Exception("ERROR!")        


# Task
def TwitchApiTask():
    twitchOrders=TwitchOrder.objects.all()
    for order in twitchOrders:
        if  int(order.apiOrderId)!=int(-1) and order.status!='completed':   
            response=APIRequest(order.apiOrderId)
            order.status=response['status']
            order.joinDelay=response['delay_time']
            order.viewsDone=response['views']
            order.save()




# Task Scheduling
scheduler=BackgroundScheduler()
scheduler.add_job(TwitchApiTask , 'interval' , minutes=1)
scheduler.add_jobstore(DjangoJobStore(), "default")
scheduler.start()
atexit.register(lambda: scheduler.shutdown(wait=False))
