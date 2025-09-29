from rest_framework import serializers
from skills.serializers import SkillSerializer
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    technologies_used = SkillSerializer(many=True, read_only=True)
    project_type_display = serializers.CharField(source='get_project_type_display', read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'project_type', 'project_type_display', 
            'technologies_used', 'github_url', 'live_demo_url', 
            'architecture_diagram', 'featured', 'created', 'modified'
        ]