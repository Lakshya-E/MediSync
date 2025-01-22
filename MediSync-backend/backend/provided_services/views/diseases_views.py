# Create your views here.
from rest_framework.viewsets import ModelViewSet
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..models import Disease
from ..serializers import DiseaseSerializer

class DiseaseViewSet(ModelViewSet):
    queryset = Disease.objects.all()
    serializer_class = DiseaseSerializer

    @swagger_auto_schema(
        operation_summary="List all diseases",
        operation_description="Retrieve a list of all diseases in the database.",
        responses={200: DiseaseSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Retrieve a specific disease",
        operation_description="Retrieve details of a disease by its ID.",
        responses={200: DiseaseSerializer()},
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Create a new disease",
        operation_description="Add a new disease with its name, premedication, treatment plan, diet plan, and forbidden items.",
        request_body=DiseaseSerializer,
        responses={201: DiseaseSerializer()},
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Update an existing disease",
        operation_description="Fully update a disease object, replacing all fields.",
        request_body=DiseaseSerializer,
        responses={200: DiseaseSerializer()},
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Partially update a disease",
        operation_description="Update one or more fields of an existing disease object.",
        request_body=DiseaseSerializer,
        responses={200: DiseaseSerializer()},
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Delete a disease",
        operation_description="Remove a disease object from the database by its ID.",
        responses={204: "No Content"},
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)