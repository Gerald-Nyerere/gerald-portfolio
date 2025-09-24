from django.shortcuts import render
from django.http import JsonResponse
from .models import AboutMe
from certifications.models import Certification
from skills.models import Skill
from .serializers import AboutMeSerializer
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# ===== VIEWS for React frontend =====
@csrf_exempt
def about_me_api(request):
    """Return About Me data as JSON for React frontend"""
    about_me = AboutMe.objects.first()
    certifications = Certification.objects.all().order_by('-issue_date')
    skills = Skill.objects.all()

    # Group skills by category
    skill_categories = {}
    for skill in skills:
        skill_categories.setdefault(skill.category, []).append(skill.name)

    data = {
        "about_me": {
           "name": getattr(about_me, "full_name", None),
            "bio": getattr(about_me, "bio_md", None),
        },
        "certifications": list(certifications.values("name", "issuer", "issue_date")),
        "skills": skill_categories,
    }
    return JsonResponse(data)

# ===== API VIEWS =====
@method_decorator(csrf_exempt, name='dispatch')  
class AboutMeListAPIView(viewsets.ModelViewSet):
    """API endpoint for About Me data"""
    queryset = AboutMe.objects.all()
    serializer_class = AboutMeSerializer




