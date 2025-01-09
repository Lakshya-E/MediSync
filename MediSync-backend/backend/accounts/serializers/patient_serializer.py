from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from ..models.user_model import User

class PatientSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'user_type']
        extra_kwargs = {
            'password': {'write_only': True},
            'user_type': {'read_only': True},
        }

    def create(self, validated_data):
        # Set the user type as 'patient' explicitly
        validated_data['user_type'] = 'patient'
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            user_type=validated_data['user_type']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username_or_email = data.get('username_or_email')
        password = data.get('password')

        if not username_or_email or not password:
            raise serializers.ValidationError("Fields cannot be empty")

        user = None
        try:
            if '@' in username_or_email:
                # If it's an email, authenticate based on email
                user = get_user_model().objects.get(email=username_or_email)
            else:
                # If it's a username, authenticate based on username
                user = get_user_model().objects.get(username=username_or_email)
        except get_user_model().DoesNotExist:
            serializers.ValidationError(f"User not found for {username_or_email}")

        print(user)

        if user is None or not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials. Please try again.")

        if user.user_type != 'patient':
            raise serializers.ValidationError("Only patients can log in here.")

        data['user'] = user
        return data
