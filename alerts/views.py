from os import stat
from time import sleep
from django.http.response import JsonResponse
from django.shortcuts import render, redirect
import json
import requests
from .models import Emails
from .forms import AlertForm
from django.contrib import messages
from django.http import HttpResponse
from .tasks import sleepy
from django.views.decorators.csrf import csrf_protect

# Create your views here.

def view(request):
    with open('state_data.json') as f:
        data = json.load(f)
        state_data = data['states']

    context = {'state_data': state_data}
    return render(request, 'alerts/home.html', context)

def alerts(request):
    
    if request.method == 'POST':
        form = AlertForm(request.POST)
        if form.is_valid():            
            form.save()
            messages.success(request, f'Your Account has been created! You are now able to Log in')
            return redirect('view')
            

    else:
        form = AlertForm()       
    return render(request, 'alerts/alerts.html', {"form":form})
    
def index(request):

    return render(request, 'index.html')

def save_data(request):
    print(request)
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        form = AlertForm(data)
        if form.is_valid:
            form.save()
            return JsonResponse(data, safe=False)
        return JsonResponse({'message': 'error'}, status=403)

    return JsonResponse('failed', safe=False)