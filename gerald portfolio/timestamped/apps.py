from django.apps import AppConfig


class TimestampedConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'timestamped'
