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

