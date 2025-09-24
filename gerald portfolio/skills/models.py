from django.db import models
from timestamped.models import TimeStampedModel

# Create your models here.
class Skill(TimeStampedModel):
    class Category(models.TextChoices):
        PROGRAMMING_LANGUAGE = "Programming Language", "Programming Language"
        FRAMEWORK = "Framework", "Framework"
        API_ARCHITECTURE = "API & Architecture", "API & Architecture"
        DEVOPS_DEPLOYMENT = "DevOps & Deployment", "DevOps & Deployment"
        SECURITY_AUTH = "Authentication & Security", "Authentication & Security"
        CLOUD = "Cloud", "Cloud"
        DATABASE = "Database", "Database"
        TOOLS = "Tools", "Tools"
        SOFT_SKILLS = "Soft Skills", "Soft Skills"
    class Level(models.TextChoices):
        BEGINNER = "Beginner", "Beginner"
        INTERMEDIATE = "Intermediate", "Intermediate"
        ADVANCED = "Advanced", "Advanced"

    name = models.CharField(max_length=120, unique=True)
    category = models.CharField(max_length=32, choices=Category.choices)
    level = models.CharField(max_length=20, choices=Level.choices, default=Level.BEGINNER)
    description = models.CharField(max_length=255, blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text="Icon class name (e.g., from Font Awesome)")

    class Meta:
        ordering = ["category", "name"]

    def __str__(self):
        return f"{self.name} ({self.category})"
