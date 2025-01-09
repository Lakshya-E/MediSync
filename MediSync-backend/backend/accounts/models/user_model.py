from django.db import models
from django.contrib.auth.models import AbstractUser

# Extend Django's AbstractUser to customize the User model
class User(AbstractUser):
    # Additional fields for user types
    USER_TYPE_CHOICES = [
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('staff', 'Staff'),
        ('administrator', 'Administrator'),
        ('superuser', 'SuperUser'),
        ('superhelper', 'SuperHelper'),
    ]
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    
    # Override groups and user_permissions fields to resolve clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )
    
    organization = models.ForeignKey(
        'Organization',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='users'
    )
    
    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"

# Model for App Staff
class AppStaff(models.Model):
    ROLE_CHOICES = [
        ('superuser', 'SuperUser'),
        ('superhelper', 'SuperHelper'),
    ]
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='app_staff'
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    permissions = models.JSONField(null=True, blank=True)  # Optional permissions field
    
    def __str__(self):
        return f"{self.user.username} - {self.get_role_display()}"

# Example Organization Model (if needed)
class Organization(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
