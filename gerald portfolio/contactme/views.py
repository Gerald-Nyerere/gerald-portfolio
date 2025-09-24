from django.shortcuts import render, redirect
from .forms import ContactForm
from .models import ContactMe 
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .serializers import ContactMeSerializer
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response



# ===== API VIEWS =====
class ContactViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Contact form submissions.
    Supports POST (create) and GET (list).
    """
    queryset = ContactMe.objects.all()
    serializer_class = ContactMeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)