from django.db import models
from timestamped.models import TimeStampedModel

# Create your models here.
class AboutMe(TimeStampedModel):
    full_name = models.CharField(max_length=120)
    title = models.CharField(max_length=160, blank=True)
    location = models.CharField(max_length=120, blank=True)
    email_public = models.EmailField(blank=True)
    phone_public = models.CharField(max_length=50, blank=True)
    bio_md = models.TextField(help_text="Markdown supported", blank=True)
    resume_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    photo = models.ImageField(upload_to="profile/", blank=True, null=True)

    class Meta:
        verbose_name_plural = "About me"
        constraints = [
            models.UniqueConstraint(fields=['full_name'], name='unique_about_me')
        ]

    def __str__(self):
        return self.full_name
