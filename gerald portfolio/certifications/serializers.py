from rest_framework import serializers
from .models import Certification

class CertificationSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    def get_image(self, obj):
        try:
            return str(obj.image.url) if obj.image else None
        except:
            return None
    
    class Meta:
        model = Certification
        fields = '__all__'