from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import AboutMeListAPIView

router = DefaultRouter()
router.register(r'about', AboutMeListAPIView)

# Template URLs
urlpatterns = [
    path('api/about/', views.about_me_api, name='about'),

    # API URLs 
    path('api/', include(router.urls)),
]
