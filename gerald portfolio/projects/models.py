from django.db import models
from timestamped.models import TimeStampedModel
from skills.models import Skill
from cloudinary.models import CloudinaryField

# Create your models here.
class Project(TimeStampedModel):
    PROJECT_TYPES = (
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Full-stack', 'Full-stack'),
        ('Cloud', 'Cloud Architecture'),
    )
    title = models.CharField(max_length=200)
    description = models.TextField(
        help_text="Use '-' at the beginning of a line for bullet points. Example:\n- First item\n- Second item\n- Third item"
    )
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPES)
    technologies_used = models.ManyToManyField(Skill, blank=True, related_name='projects') 
    github_url = models.URLField(blank=True, null=True)
    live_demo_url = models.URLField(blank=True, null=True)
    architecture_diagram = CloudinaryField('image', folder='architecture_diagrams', blank=True, null=True)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-featured', '-created']

    def __str__(self):
        return self.title
    
