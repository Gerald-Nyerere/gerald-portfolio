from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CertificationViewSet

router = DefaultRouter()
router.register(r'certifications', CertificationViewSet)

urlpatterns = [
    # API URLs
    path('api/', include(router.urls)),
]

