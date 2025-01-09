from rest_framework import status, generics
from utils.responses import Response
from ..serializers.signup_serializers import UserSignupSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class SignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer

    @swagger_auto_schema(
        operation_description="""Sign up""",
        operation_id="user-register",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description="Username of the user"),
                'email': openapi.Schema(type=openapi.TYPE_STRING, description="Email of the user"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description="Password of the user"),
                'password2': openapi.Schema(type=openapi.TYPE_STRING, description="Confirm password"),
            },
            required=['email', 'password', 'password2'],
        ),
    )
    def create(self, request, *args, **kwargs):
        """
        Handle user sign-up with the provided username, email, and password.
        """
        try:
            print(request.data)
            serializer = UserSignupSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                print("1")
                return Response.construct_success_response(
                    status.HTTP_201_CREATED, serializer.data
                )
            print(2)
            return Response.construct_error_response(
                status.HTTP_400_BAD_REQUEST, serializer.errors
            )
        except Exception as e:
            return Response.construct_error_response(status.HTTP_400_BAD_REQUEST, str(e))
