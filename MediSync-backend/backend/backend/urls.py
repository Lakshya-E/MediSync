"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from accounts.views.signup import SignupView
from accounts.views.patient_view import PatientLoginView, CreatePatientView,GenerateTokenView
from provided_services.views.diseases_views import DiseaseViewSet
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from provided_services.routers import router
from rest_framework.permissions import AllowAny


schema_view = get_schema_view(
    openapi.Info(
        title="Medisync API",
        default_version="v1",
        description=("Medisync API Documentation\n\n"
            "Key Features:\n"
            "- **Multithreading for Concurrent Processing**: Efficient handling of appointments.\n"
            "- **Patient History Tracking**: Manage medical records, test reports, prescriptions, and more.\n"
            "- **Video Consultation**: Enable seamless online consultations.\n"
            "- **Appointment Scheduling**: Book slots based on doctor availability.\n"
            "- **Pre-Consultation Services**: Provide diet plans, medication guidance, and health check-ups.\n"
            "- **Routine Health Check-ups**: Routine tests every three months.\n"
            "\n"
            "Post-Login Features:\n"
            "- **Health Chatbot**: Prompt-based health assistance using Django Channels.\n"
            "- **Payment Gateway Integration**: Streamlined payments with service and doctor fees.\n"
            "- **Appointment Notifications**: Alerts 1 hour, 30 minutes, and 15 minutes before.\n"
            "- **Post-Appointment Actions**: Upload prescriptions, test recommendations, and follow-ups.\n"
            "- **Prescription Delivery**: Deliver prescriptions after consultations.\n"
            "- **Test Result Upload and Feedback**: Support for test result uploads and feedback.\n"
            "- **Doctor Filtering**: Search doctors by ratings, experience, and proximity.\n"
            "\n"
            "Additional Features:\n"
            "- **Success Notifications**: Confirmation messages for successful appointments.\n"
        ),
        terms_of_service="https://www.medisync.com/terms/",
        contact=openapi.Contact(email="support@medisync.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        "playground/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc",
        cache_timeout=0), name="schema-redoc"),
    path('api/login/',GenerateTokenView.as_view(),name='login'),
    path('api/user/register/', SignupView.as_view(), name='register-user'),
    path('api/patient/register/', CreatePatientView.as_view(), name='register'),
    path('api/patient/login/', PatientLoginView.as_view(), name='login'),
    path('api/', include(router.urls)),
]
