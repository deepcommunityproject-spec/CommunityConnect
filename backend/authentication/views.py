from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import AuthUser
from .serializers import RegisterSerializer, LoginSerializer
from users.models import VolunteerProfile
from organizers.models import OrganizationProfile
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
import random
from django.utils import timezone
from datetime import timedelta
from emails.signals import user_registered, otp_requested

class AuthViewSet(ViewSet):
    authentication_classes = []
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=RegisterSerializer,
        operation_summary="Register User",
        operation_description="Register as volunteer or organizer"
    )
    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        if AuthUser.objects.filter(email=data['email']).exists():
            return Response({"error": "Email already exists"}, status=400)

        user = AuthUser(email=data['email'], role=data['role'])
        user.set_password(data['password'])
        user.save()

        if data['role'] == 'volunteer':
            VolunteerProfile.objects.create(user=user, name=data['name'])
        else:
            OrganizationProfile.objects.create(user=user, name=data['name'])

        try:
            user_registered.send(sender=self.__class__, user=user)
        except Exception as e:
            print("Email Signal failed:", str(e))

        return Response({
            "message": "Registered successfully",
            "email": user.email,
            "role": user.role
        }, status=201)

    @swagger_auto_schema(
        request_body=LoginSerializer,
        operation_summary="Login User",
        operation_description="Login using email and password"
    )
    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        try:
            user = AuthUser.objects.get(email=data['email'])
        except AuthUser.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=401)

        if not user.check_password(data['password']):
            return Response({"error": "Invalid credentials"}, status=401)

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "role": user.role,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })

    @swagger_auto_schema(
        operation_summary="Logout User",
        operation_description="Logout current logged-in user"
    )
    @action(detail=False, methods=['post'])
    def logout(self, request):
        # JWT logout is primarily handled client-side
        return Response({"message": "Logged out"})

    @swagger_auto_schema(
        operation_summary="Request OTP",
        operation_description="Send OTP to email for password reset"
    )
    @action(detail=False, methods=['post'], url_path='request-otp')
    def request_otp(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=400)

        try:
            user = AuthUser.objects.get(email=email)
        except AuthUser.DoesNotExist:
            return Response({"error": "No user found with this email"}, status=404)

        # Generate 6-digit OTP
        otp = str(random.randint(100000, 999999))
        user.otp = otp
        user.otp_created_at = timezone.now()
        user.save()

        # Send OTP via signal
        otp_requested.send(sender=self.__class__, user=user, otp=otp)

        return Response({"message": "OTP sent to your email"})

    @swagger_auto_schema(
        operation_summary="Verify OTP",
        operation_description="Verify OTP for password reset"
    )
    @action(detail=False, methods=['post'], url_path='verify-otp')
    def verify_otp(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({"error": "Email and OTP are required"}, status=400)

        try:
            user = AuthUser.objects.get(email=email)
        except AuthUser.DoesNotExist:
            return Response({"error": "Invalid request"}, status=400)

        if user.otp != otp:
            return Response({"error": "Invalid OTP"}, status=400)

        # Check expiry (5 minutes)
        if user.otp_created_at < timezone.now() - timedelta(minutes=5):
            return Response({"error": "OTP has expired"}, status=400)

        # Return a success message. The frontend will then navigate to reset password.
        # To prevent direct access to reset-password, we could return a temporary token.
        # For simplicity and security, let's use the OTP itself as a token in the next step, 
        # or just return a success and let the frontend pass email/otp again to reset.
        return Response({"message": "OTP verified successfully"})

    @swagger_auto_schema(
        operation_summary="Reset Password",
        operation_description="Reset password using OTP"
    )
    @action(detail=False, methods=['post'], url_path='reset-password')
    def reset_password(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('new_password')

        if not email or not otp or not new_password:
            return Response({"error": "All fields are required"}, status=400)

        try:
            user = AuthUser.objects.get(email=email)
        except AuthUser.DoesNotExist:
            return Response({"error": "Invalid request"}, status=400)

        if user.otp != otp:
            return Response({"error": "Invalid OTP or session expired"}, status=400)

        # Re-check expiry just in case
        if user.otp_created_at < timezone.now() - timedelta(minutes=7): # 2 mins buffer for reset page
            return Response({"error": "Session expired"}, status=400)

        user.set_password(new_password)
        user.otp = None # Clear OTP after use
        user.otp_created_at = None
        user.save()

        return Response({"message": "Password reset successfully"})
