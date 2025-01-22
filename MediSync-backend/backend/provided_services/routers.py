from rest_framework.routers import DefaultRouter
from .views.diseases_views import DiseaseViewSet
router = DefaultRouter()
router.register(r'diseases', DiseaseViewSet)