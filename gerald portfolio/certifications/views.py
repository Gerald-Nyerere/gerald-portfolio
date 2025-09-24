from django.shortcuts import render, get_object_or_404  
from .models import Certification
from .serializers import CertificationSerializer
from rest_framework import viewsets


# ===== API VIEWS =====
class CertificationViewSet(viewsets.ModelViewSet):  
    """API endpoint for Certifications"""
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


