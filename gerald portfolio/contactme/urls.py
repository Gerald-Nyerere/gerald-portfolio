from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet

router = DefaultRouter()
router.register(r'contact', ContactViewSet)

urlpatterns = [

    # API URLs 
    path('api/', include(router.urls)),
]

