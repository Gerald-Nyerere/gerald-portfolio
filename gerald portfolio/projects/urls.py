from django.urls import path, include
from rest_framework.routers import DefaultRouter
from.views import ProjectListAPIView

router = DefaultRouter()
router.register(r'projects', ProjectListAPIView)


urlpatterns = [

    # API URLs 
    path('api/', include(router.urls)),
]

