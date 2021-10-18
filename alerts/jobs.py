from .models import Emails
import json
import schedule
import time
import requests
from django.core.mail import send_mail
import datetime
import math
import random

with open('all_data.json') as f:
    district_data = json.load(f)

with open('state_data.json') as g:
    data = json.load(g)
    state_data = data['states']

dt = datetime.datetime.now()
next_day = dt + \
    datetime.timedelta(days=1)
after_1day =  next_day.strftime("%d-%m-%Y")
print(after_1day)

def send_requests(d_id):
    print("send")
    print(d_id)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'}
    para = {
        'district_id': d_id,
        'date': after_1day
        }
    r_availability = requests.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict', params = para, headers=headers)
    
    if(r_availability.ok):

        print(r_availability)
        sessions = r_availability.json()['sessions']

        available_array = []

        for i in sessions:
            if(i['fee_type'] == "Free" and (i['available_capacity_dose1'] > 0 or i['available_capacity_dose2'] > 0)):
                j = {'date':i['date'], 'name':i['name'], 'address':i['address'], 'pincode':i['pincode'], 'available_capacity_dose1':i['available_capacity_dose1'], 'available_capacity_dose2':i['available_capacity_dose2'], 'min_age_limit':i['min_age_limit'], 'vaccine':i['vaccine']}
                available_array.append(j)

        
        filtered_users = Emails.objects.filter(district=d_id)
        print(filtered_users)
        if(filtered_users.count() > 0):
            e = filtered_users
            
            emails_dict = {}
            for email in e:
                emails_dict[email.email] = []
                for em in email.pinCode:       
                    for availabe_slot in available_array:
                        if(availabe_slot['pincode'] == em and availabe_slot['min_age_limit'] == email.age):
                            emails_dict[email.email].append({'date':availabe_slot['date'], 'name':availabe_slot['name'], 'pincode':availabe_slot['pincode'], 'available_capacity_dose1':availabe_slot['available_capacity_dose1'], 'available_capacity_dose2':availabe_slot['available_capacity_dose2'], 'min_age_limit':availabe_slot['min_age_limit'], 'vaccine':availabe_slot['vaccine']})                  
                            
            
            for email in e:
                email_id_data = emails_dict[email.email]
                empty = ""
                nl = '\n'
                for i in email_id_data:
                    data = f"Date: {i['date']}{nl}Name: {i['name']}{nl}Pincode: {i['pincode']}{nl}Dose 1: {i['available_capacity_dose1']}{nl}Dose 2: {i['available_capacity_dose2']}{nl}Age: {i['min_age_limit']}{nl}Vaccine: {i['vaccine']}{nl}{nl}"
                    empty += data
                print(empty)
                print(email.email)
                print(len(empty))
                if(len(empty) > 0):
                    send_mail(
                        'COVAXIN ALERT',
                        f"{empty}",
                        'coviaction@gmail.com',
                        [f'{email.email}'],
                        fail_silently=False,
                    )
    else:
        print("Error")
            

print("hello")
def job():
    print("I'm working...")
    for i in state_data:
        current_state = str(i['state_id'])
        district_array = district_data[current_state]
        for j in district_array:           
            main_sleep_time = (len(district_array) * 2) + 10
            print(main_sleep_time)
            district_id = j['district_id']
            send_requests(district_id)
            time.sleep(round((random.random() * 3), 2))

        print(f'district length: {len(district_array)}')
        random_sleep = math.floor((random.random()) * 10) + 1
        print(f"random: {main_sleep_time + random_sleep}")
        time.sleep(main_sleep_time + random_sleep)

                    

schedule.every(1).seconds.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)


