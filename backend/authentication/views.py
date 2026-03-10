from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import AuthUser
from .serializers import RegisterSerializer, LoginSerializer
from users.models import VolunteerProfile
from organizers.models import OrganizationProfile
from drf_yasg.utils import swagger_auto_schema

class AuthViewSet(ViewSet):

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

        request.session.flush()  # Clear old session first

        request.session['user_id'] = user.id
        request.session['role'] = user.role
        request.session.modified = True  # Force save session

        return Response({
            "message": "Login successful",
            "role": user.role
        })

    @swagger_auto_schema(
        operation_summary="Logout User",
        operation_description="Logout current logged-in user"
    )
    @action(detail=False, methods=['post'])
    def logout(self, request):
        request.session.flush()
        return Response({"message": "Logged out"})

    # For React only: Check and verify user. 
    @action(detail=False, methods=['get'])
    def check_session(self, request):
        user_id = request.session.get('user_id')

        if not user_id:
            return Response({"authenticated": False}, status=401)

        return Response({
            "authenticated": True,
            "role": request.session.get('role')
        })
