from rest_framework import serializers
from .models import Skill

class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'level', 'category_display', 'description', 'created', 'modified']
