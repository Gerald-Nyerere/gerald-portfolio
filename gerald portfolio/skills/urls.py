from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import SkillListAPIView

router = DefaultRouter()
router.register(r'skills', SkillListAPIView)

urlpatterns = [


    # API URLs 
    path('api/', include(router.urls)),
]

