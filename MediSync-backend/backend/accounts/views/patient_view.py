from rest_framework import status, generics,viewsets
from utils.responses import Response
from drf_yasg import openapi
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from drf_yasg.utils import swagger_auto_schema
from ..serializers.patient_serializer import PatientSerializer, LoginSerializer
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAdminUser,AllowAny
from ..models.user_model import User



class GenerateTokenView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access

    # Swagger schema for API documentation
    @csrf_exempt
    @swagger_auto_schema(
        operation_description="Generate a token for the authenticated user",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='The username of the user',
                    example='testuser'
                ),
                'password': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='The password of the user',
                    example='password123'
                ),
            },
            required=['username', 'password']
        ),
        responses={
            200: openapi.Response(
                description="Token generated successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'token': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description="The authentication token",
                            example="abcdef1234567890"
                        )
                    }
                )
            ),
            401: openapi.Response(
                description="Invalid credentials",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description="Error message",
                            example="Invalid username or password"
                        )
                    }
                )
            )
        }
    )
    def post(self, request):
        # Authenticate the user based on username and password
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user using Django's authenticate method
        user = authenticate(username=username, password=password)
        if user:
            # Generate or retrieve the token for the authenticated user
            token, created = Token.objects.get_or_create(user=user)
            return Response.construct_success_response(status.HTTP_200_OK,{'token': token.key})

        # Invalid credentials
        return Response.construct_error_response(
            status.HTTP_401_UNAUTHORIZED, {'error': 'Invalid username or password'}
        )

class PatientViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(user_type='patient')
    serializer_class = PatientSerializer

    @csrf_exempt
    @swagger_auto_schema(
        operation_description="Retrieve a list of patients",
        responses={
            200: openapi.Response("List of patients retrieved successfully", PatientSerializer(many=True)),
            400: "Invalid request"
        },
    )
    def list(self, request, *args, **kwargs):
        try:
            patients = self.queryset
            serializer = self.get_serializer(patients, many=True)
            return Response.construct_success_response(
                status.HTTP_200_OK, {"message": "List of patients retrieved successfully", "data": serializer.data}
            )
        except Exception as e:
            return Response.construct_error_response(
                status.HTTP_400_BAD_REQUEST,{"error": str(e)}
            )
    @csrf_exempt
    @swagger_auto_schema(
        operation_description="Retrieve a specific patient by ID",
        responses={
            200: openapi.Response("Patient retrieved successfully", PatientSerializer),
            404: "Patient not found"
        },
    )
    def retrieve(self, request, *args, **kwargs):
        try:
            patient = self.get_object()
            serializer = self.get_serializer(patient)
            return Response.construct_success_response(
                status.HTTP_200_OK, {"message": "Patient retrieved successfully", "data": serializer.data}
            )
        except Exception as e:
            return Response.construct_error_response(
                status.HTTP_404_NOT_FOUND,{"error": str(e)}
            )
    @csrf_exempt
    @swagger_auto_schema(
        operation_description="Create a new patient",
        request_body=PatientSerializer,
        responses={
            201: openapi.Response("Patient created successfully", PatientSerializer),
            400: "Invalid data provided"
        },
    )
    def create(self, request, *args, **kwargs):
        try:
            data = request.data.copy()
            data['user_type'] = 'patient'

            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response.construct_success_response(
                   status.HTTP_201_CREATED,
                    {"message": "Patient created successfully", "data": serializer.data},
                )
            return Response.construct_error_response(
            status.HTTP_400_BAD_REQUEST,{"errors": serializer.errors}
            )
        except Exception as e:
            return Response.construct_error_response(
                status.HTTP_400_BAD_REQUEST,{"error": str(e)}
            )
    @csrf_exempt
    @swagger_auto_schema(
        operation_description="Update a patient's details",
        request_body=PatientSerializer,
        responses={
            200: openapi.Response("Patient updated successfully", PatientSerializer),
            400: "Invalid data provided",
            404: "Patient not found"
        },
    )
    def update(self, request, *args, **kwargs):
        try:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            if serializer.is_valid():
                serializer.save()
                return Response.construct_success_response(
                    status.HTTP_200_OK, {"message": "Patient updated successfully", "data": serializer.data}
                )
            return Response.construct_error_response(
                status.HTTP_400_BAD_REQUEST, {"errors": serializer.errors}
            )
        except Exception as e:
            return Response.construct_error_response(
                status.HTTP_404_NOT_FOUND,{"error": str(e)}
            )
    @csrf_exempt
    @swagger_auto_schema(
        operation_description="Delete a patient",
        responses={
            204: "Patient deleted successfully",
            404: "Patient not found"
        },
    )
    def destroy(self, request, *args, **kwargs):
        try:
            patient = self.get_object()
            patient.delete()
            return Response.construct_success_response(
                status.HTTP_204_NO_CONTENT, {"message": "Patient deleted successfully"}
            )
        except Exception as e:
            return Response.construct_error_response(
             status.HTTP_404_NOT_FOUND, {"error": str(e)}
            )


class PatientLoginView(APIView):
    @swagger_auto_schema(
        operation_description="Log in a patient",
        request_body=LoginSerializer,
        responses={
            200: openapi.Response("Login successful", openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(type=openapi.TYPE_STRING, description='Success message'),
                    'token': openapi.Schema(type=openapi.TYPE_STRING, description='Authentication token'),
                    'user': openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'username': openapi.Schema(type=openapi.TYPE_STRING, description='Username'),
                            'email': openapi.Schema(type=openapi.TYPE_STRING, description='Email'),
                            'user_type': openapi.Schema(type=openapi.TYPE_STRING, description='User type'),
                        }
                    )
                }
            )),
            400: "Invalid credentials or request data"
        }
    )
    def post(self, request):
        try:
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.validated_data['user']

                # Generate or retrieve an authentication token for the user
                token, created = Token.objects.get_or_create(user=user)

                return Response.construct_success_response(
                    status.HTTP_200_OK,
                    {
                        "message": "Login successful",
                        "token": token.key,
                        "user": {
                            "username": user.username,
                            "email": user.email,
                            "user_type": user.user_type
                        }
                    }
                )
            return Response.construct_error_response(status.HTTP_400_BAD_REQUEST, serializer.errors)
        except Exception as e:
            return Response.construct_error_response(status.HTTP_400_BAD_REQUEST, str(e))
