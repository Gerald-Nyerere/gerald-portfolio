from rest_framework import serializers
from .models import AboutMe

class AboutMeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='full_name')
    bio = serializers.CharField(source='bio_md')
    class Meta:
        model = AboutMe
        fields = [
            'id', 'full_name', 'title', 'location', 'email_public', 
            'phone_public', 'bio_md', 'resume_url', 'github_url', 
            'linkedin_url', 'photo', 'created', 'modified'
        ]