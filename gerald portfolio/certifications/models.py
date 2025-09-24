from django.db import models
from timestamped.models import TimeStampedModel
from django.utils import timezone  
# Create your models here.
class Certification(TimeStampedModel):
    class Category(models.TextChoices):
        AWS = "aws", "AWS"
        ALX = "Alx", "Alx"
        OTHER = "other", "other"

    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=Category.choices)
    issue_date = models.DateField()
    expiration_date = models.DateField(blank=True, null=True)
    credential_id = models.CharField(max_length=100, blank=True)
    credential_url = models.URLField(blank=True)
    image = models.ImageField(upload_to="certification", blank=True, null=True)

    class Meta:
        ordering = ["-issue_date"]

    def __str__(self):
        return f"{self.name} ({self.issuer})"

    def is_expired(self):
        if self.expiration_date:
            return self.expiration_date < timezone.now().date()
        return False

