from django.contrib import admin
from .models.user_model import User, AppStaff, Organization

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'user_type', 'email', 'organization')

@admin.register(AppStaff)
class AppStaffAdmin(admin.ModelAdmin):
    list_display = ('user', 'role')

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
