from django.apps import AppConfig
import os
from .tasks import run

class AlertsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'alerts'

    def ready(self):
        
        if os.environ.get('RUN_MAIN', None) != 'true':
            run.delay()
