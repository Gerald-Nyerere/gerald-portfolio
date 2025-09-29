from rest_framework import serializers
from .models import Certification

class CertificationSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.url  # This returns the full Cloudinary URL
        return None
    class Meta:
        model = Certification
        fields = '__all__'