from rest_framework import serializers
from .models import Certification

class CertificationSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Certification
        fields = '__all__'

    def get_image(self, obj):
        if obj.image:
            return obj.image.url 
        return None