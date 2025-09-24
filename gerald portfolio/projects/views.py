from django.shortcuts import render, get_object_or_404  
from .models import Project
from .serializers import ProjectSerializer
from rest_framework import viewsets



# ===== API VIEWS =====
class ProjectListAPIView(viewsets.ReadOnlyModelViewSet):
    """API endpoint for Projects"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer