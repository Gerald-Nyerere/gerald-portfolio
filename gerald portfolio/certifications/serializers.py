from rest_framework import serializers
from .models import Certification

class CertificationSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = ["id", "created", "modified", "name", "issuer",
            "category", "issue_date", "expiration_date",
            "credential_id", "credential_url", "image"]
        
    def get_image(self, obj):
        if obj.image:
            return obj.image.url 
        return None