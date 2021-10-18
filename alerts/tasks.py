from os import remove
from celery import shared_task
from time import sleep
from celery import Celery
from twilio.rest import Client
from django.core.mail import send_mail
# from .models import Emails

# app = Celery('tasks', broker='pyamqp://guest@localhost//')

@shared_task
def add(x, y):
    return x + y

@shared_task
def sleepy(duration):
    sleep(duration)
    return None

@shared_task
def send_data(self):

    account_sid = "AC17671a5b481eadb1be7e2fa2fb1f78cd"
    auth_token = "15b4c929766a427f60983fa1cb1908ef"       
    client = Client(account_sid, auth_token)

    message = client.messages \
                    .create(
                        body=f'{self} have registered on COVAXIN',
                        from_='+19203209072',
                        to='+918837856040'
                    )

       

    print(message.sid)

    send_mail(
        'COVAXIN ALERT',
        'Your Account has been created. We will send you alerts whenever slots are empty',
        'coviaction@gmail.com',
        [f'{self}'],
        fail_silently=False,

    )
    return None

@shared_task
def run():
    from . import jobs
    jobs.start_scheduler()
