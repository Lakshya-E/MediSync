from rest_framework.routers import DefaultRouter
from .views.patient_view import PatientViewSet
prouter = DefaultRouter()
prouter.register(r'patient', PatientViewSet)