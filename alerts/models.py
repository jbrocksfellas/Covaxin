from django.db import models
from django.contrib.postgres.fields import ArrayField
from twilio.rest import Client
from django.core.mail import send_mail
from .tasks import send_data
import os
import json
from django import forms

# Create your models here.
with open('state_data.json') as f:
    data = json.load(f)
    state_data = data['states']

state_choices = []
for i in state_data:
    state_choices.append((i['state_id'], i['state_name']))


class Emails(models.Model):
    email = models.EmailField(max_length=254, unique=True, null=False)
    pinCode = ArrayField(models.IntegerField(null=False, blank=False))
    AGE = [(18, "18"), (45, "45")]
    age = models.IntegerField(choices=AGE, default=18)

    state = models.IntegerField(choices=state_choices, blank=False, null=False)
    
    district = models.IntegerField(blank=False, null=False)

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        send_data.delay(self.email)
        return super().save(*args, **kwargs)
    
    