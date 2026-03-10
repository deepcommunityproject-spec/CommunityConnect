from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from authentication.models import AuthUser
from .models import VolunteerProfile
from .serializers import VolunteerProfileSerializer
from organizers.models import Opportunity, Application
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404
from django.utils import timezone

def get_user(request):
    uid = request.session.get('user_id')
    return AuthUser.objects.filter(id=uid).first()

class VolunteerViewSet(ViewSet):

    @swagger_auto_schema(
        method='get',
        operation_summary="Get Volunteer Profile",
        operation_description="Retrieve the logged-in volunteer's profile details."
    )
    @swagger_auto_schema(
        method='put',
        request_body=VolunteerProfileSerializer,
        operation_summary="Update Volunteer Profile",
        operation_description="Update the logged-in volunteer's profile information."
    )
    @action(detail=False, methods=['get', 'put'])
    def profile(self, request):
        user = get_user(request)
        if not user or user.role != 'volunteer':
            return Response({"error": "Unauthorized"}, status=401)

        profile = get_object_or_404(VolunteerProfile, user=user)

        if request.method == 'GET':
            return Response({
                "name": profile.name,
                "email": profile.user.email,
                "bio": profile.bio,
                "image": profile.image.url if profile.image else None,
                "phone": profile.phone,
                "created_at": profile.created_at
            })
        serializer = VolunteerProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"message": "Profile updated"})

    @swagger_auto_schema(
        method='get',
        operation_summary="View Opportunities Feed",
        operation_description="Retrieve all available opportunities ordered by latest first."
    )
    @action(detail=False, methods=['get'])
    def feed(self, request):
        data = [{
            "id": o.id,
            "title": o.title,
            "description": o.description,
            "organization": o.organization.name,
            "organization_image": o.organization.image.url if o.organization.image else None,
            "location": o.location,
            "start_date": o.start_date,
            "end_date": o.end_date,
            "created_at": o.created_at
        } for o in Opportunity.objects.filter(end_date__gte=timezone.now()).order_by('-created_at')]

        return Response(data)

    @swagger_auto_schema(
        method='post',
        operation_summary="Apply for Opportunity",
        operation_description="Submit an application for the selected opportunity."
    )
    @action(detail=True, methods=['post'])
    def apply(self, request, pk=None):

        user = get_user(request)
        if not user or user.role != 'volunteer':
            return Response({"error": "Unauthorized"}, status=401)

        profile = get_object_or_404(VolunteerProfile, user=user)
        try:
            opportunity = get_object_or_404(Opportunity, id=pk)
        except Opportunity.DoesNotExist:
            return Response({"error": "Invalid opportunity"}, status=404)

        # Prevent duplicate request
        if Application.objects.filter(
            volunteer=profile,
            opportunity=opportunity
        ).exists():
            return Response(
                {"error": "You have already applied to this opportunity"},
                status=400
            )

        if opportunity.end_date < timezone.now():
            return Response(
                {"error": "Opportunity has expired"},
                status=400
            )

        Application.objects.create(
            volunteer=profile,
            opportunity=opportunity
        )
        return Response({"message": "Request sent"})

    @swagger_auto_schema(
        method='get',
        operation_summary="View My Application History",
        operation_description="Retrieve all applications submitted by the logged-in volunteer, ordered by latest first."
    )
    @action(detail=False, methods=['get'])
    def history(self, request):
        user = get_user(request)
        if not user or user.role != 'volunteer':
            return Response({"error": "Unauthorized"}, status=401)

        profile = get_object_or_404(VolunteerProfile, user=user)

        applications = Application.objects.filter(
            volunteer=profile
        ).order_by('-created_at')

        data = [{
            "id": app.id,
            "opportunity": app.opportunity.title,
            "organization": app.opportunity.organization.name,
            "status": app.status,
            "location": app.opportunity.location,
            "applied_at": app.created_at
        } for app in applications]

        return Response(data)

    @swagger_auto_schema(
        method='get',
        operation_summary="View Opportunity Detail",
        operation_description="Retrieve detailed information about a specific opportunity."
    )
    @action(detail=True, methods=['get'])
    def opportunity_detail(self, request, pk=None):

        opportunity = get_object_or_404(Opportunity, id=pk)

        data = {
            "id": opportunity.id,
            "title": opportunity.title,
            "description": opportunity.description,
            "organization": opportunity.organization.name,
            "organization_image": opportunity.organization.image.url if opportunity.organization.image else None,
            "location": opportunity.location,
            "start_date": opportunity.start_date,
            "end_date": opportunity.end_date,
            "total_slots": opportunity.total_slots,
            "created_at": opportunity.created_at,
        }

        return Response(data)
