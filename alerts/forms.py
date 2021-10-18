from django.forms import ModelForm, widgets
from .models import Emails
from django import forms
import json

with open('state_data.json') as f:
    data = json.load(f)
    state_data = data['states']

state_choices = []
for i in state_data:
    state_choices.append((i['state_id'], i['state_name']))

class AlertForm(ModelForm):
    
    class Meta:
        model = Emails
        fields = ['email', 'pinCode', 'age', 'state', 'district']
        widgets = {
            'state': forms.Select(attrs={'onchange': "model_state_ftn();", 'class': 'model_select'}),
            'district': forms.Select(attrs={'class':'district_options_model', 'id':'district_options_model'})
        }