from django.db import models
from timestamped.models import TimeStampedModel

# Create your models here.
   
class ContactMe(TimeStampedModel):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    
    def __str__(self):
        return f"Message from {self.name} ({self.email})"
    