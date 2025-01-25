from django.db import models

# Create your models here.
class Disease(models.Model):
    name = models.CharField(max_length=255)
    premedication = models.JSONField()  # Store as a JSON list
    treatment_plan = models.JSONField()  # Store as a JSON list
    diet_plan = models.JSONField()  # Store as a JSON list
    not_to_eat = models.JSONField()  # Store as a JSON list

    def __str__(self):
        return self.name

class Hospital(models.Model):
    TYPE_CHOICES = [
        ('hospital', 'Hospital'),
        ('clinic', 'Clinic'),
    ]
    
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    location = models.TextField()
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    contact_info = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name