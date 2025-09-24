from rest_framework import serializers
from .models import ContactMe

class ContactMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMe
        fields = ['id', 'name', 'email', 'message', 'created', 'modified']