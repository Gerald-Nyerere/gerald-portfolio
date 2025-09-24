from django.shortcuts import render
from django.http import JsonResponse
from aboutme.models import AboutMe
from projects.models import Project
from skills.models import Skill
from certifications.models import Certification
from .serializers import SkillSerializer
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt


# ===== API VIEW for React =====
@csrf_exempt
def home_api(request):
    """Return aggregated data for Home page as JSON for React frontend"""
    about_me = AboutMe.objects.first()
    featured_projects = Project.objects.filter(featured=True)[:3]
    key_skills = Skill.objects.all()[:30]
    latest_certifications = Certification.objects.all().order_by("-issue_date")[:5]

    # Group skills by category
    skill_categories = {}
    for skill in key_skills:
        skill_categories.setdefault(skill.category, []).append(skill.name)

    data = {
        "about_me": {
            "name": getattr(about_me, "name", None),
            "bio": getattr(about_me, "bio", None),
        },
        "featured_projects": list(
            featured_projects.values("id", "title", "description", "image", "repo_url")
        ),
        "skills": skill_categories,
        "latest_certifications": list(
            latest_certifications.values("name", "issuer", "issue_date")
        ),
    }
    return JsonResponse(data)



# ===== API VIEWS =====
class SkillListAPIView(viewsets.ModelViewSet):
    """API endpoint for Skills"""
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
