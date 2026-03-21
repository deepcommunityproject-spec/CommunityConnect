from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from authentication.models import AuthUser
from .models import VolunteerProfile, OpportunityFeedback
from .serializers import VolunteerProfileSerializer
from organizers.models import Opportunity, Application, OrganizationProfile
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404
from django.utils import timezone


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
        user = request.user
        if not user or not user.is_authenticated or user.role != 'volunteer':
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
        user = request.user
        if not user or not user.is_authenticated or user.role != 'volunteer':
            return Response({"error": "Unauthorized"}, status=401)
        
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
        } for o in Opportunity.objects.filter(is_active=True, end_date__gte=timezone.now()).order_by('-created_at')]

        return Response(data)

    @swagger_auto_schema(
        method='post',
        operation_summary="Apply for Opportunity",
        operation_description="Submit an application for the selected opportunity."
    )
    @action(detail=True, methods=['post'])
    def apply(self, request, pk=None):

        user = request.user
        if not user or not user.is_authenticated or user.role != 'volunteer':
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
        user = request.user
        if not user or not user.is_authenticated or user.role != 'volunteer':
            return Response({"error": "Unauthorized"}, status=401)

        profile = get_object_or_404(VolunteerProfile, user=user)

        applications = Application.objects.filter(
            volunteer=profile
        ).order_by('-created_at')

        data = [{
            "id": app.id,
            "organization_id": app.opportunity.organization.id,
            "opportunity": app.opportunity.title,
            "organization": app.opportunity.organization.name,
            "status": app.status,
            "location": app.opportunity.location,
            "applied_at": app.created_at
        } for app in applications]

        return Response(data)

    @swagger_auto_schema(
        method='get',
        operation_summary="Opportunity Detail",
        operation_description="Returns opportunity details including feedback comments."
    )
    @action(detail=True, methods=['get'])
    def opportunity_detail(self, request, pk=None):
        opportunity = get_object_or_404(Opportunity, id=pk)
        user = request.user
        volunteer = None
        if user and user.is_authenticated and user.role == "volunteer":
            volunteer = VolunteerProfile.objects.filter(user=user).first()

        feedbacks = OpportunityFeedback.objects.filter(
            opportunity=opportunity
        )
        feedback_data = []

        for f in feedbacks:
            is_my_comment = False
            if volunteer and f.volunteer_id == volunteer.id:
                is_my_comment = True

            feedback_data.append({
                "id": f.id,
                "volunteer_name": f.volunteer.name,
                "comment": f.comment,
                "created_at": f.created_at,
                "is_my_comment": is_my_comment
            })

        data = {
            "id": opportunity.id,
            "organization_id": opportunity.organization.id,
            "title": opportunity.title,
            "description": opportunity.description,
            "organization": opportunity.organization.name,
            "organization_image": opportunity.organization.image.url if opportunity.organization.image else None,
            "location": opportunity.location,
            "start_date": opportunity.start_date,
            "end_date": opportunity.end_date,
            "total_slots": opportunity.total_slots,
            "created_at": opportunity.created_at,
            "slots_filled": opportunity.slots_filled,
            "feedbacks": feedback_data
        }

        return Response(data)

    @swagger_auto_schema(
        method='get',
        operation_summary="View Organization Detail",
        operation_description="Volunteer can view details of a specific organization."
    )
    @action(detail=True, methods=['get'])
    def organization_detail(self, request, pk=None):
        org = OrganizationProfile.objects.filter(id=pk).first()
        if not org:
            return Response({"error": "Organization not found"}, status=404)

        return Response({
            "id": org.id,
            "name": org.name,
            "bio": org.bio,
            "image": org.image.url if org.image else None,
            "contact_email": org.contact_email,
            "contact_phone": org.contact_phone,
            "website": org.website,
            "address": org.address,
            "created_at": org.created_at
        })

    @swagger_auto_schema(
        method='post',
        operation_summary="Add Feedback",
        operation_description="Volunteer can add feedback comment to an opportunity."
    )
    @action(detail=True, methods=['post'])
    def add_feedback(self, request, pk=None):
        user = request.user

        if not user or not user.is_authenticated or user.role != "volunteer":
            return Response({"error": "Unauthorized"}, status=401)

        volunteer = get_object_or_404(VolunteerProfile, user=user)
        opportunity = get_object_or_404(Opportunity, id=pk)
        comment = request.data.get("comment")

        if not comment:
            return Response({"error": "Comment is required"}, status=400)

        # Check for existing feedback
        if OpportunityFeedback.objects.filter(opportunity=opportunity, volunteer=volunteer).exists():
            return Response({"error": "You have already added feedback for this opportunity"}, status=400)

        feedback = OpportunityFeedback.objects.create(
            opportunity=opportunity,
            volunteer=volunteer,
            comment=comment
        )

        return Response({
            "message": "Feedback added successfully",
            "feedback_id": feedback.id
        })

    @swagger_auto_schema(
        method='delete',
        operation_summary="Delete Feedback",
        operation_description="Volunteer can delete their own feedback."
    )
    @action(
        detail=False,
        methods=['delete'],
        url_path='delete_feedback/(?P<feedback_id>[^/.]+)'
    )
    def delete_feedback(self, request, feedback_id=None):
        user = request.user
        if not user or not user.is_authenticated or user.role != "volunteer":
            return Response({"error": "Unauthorized"}, status=401)

        volunteer = get_object_or_404(VolunteerProfile, user=user)
        feedback = get_object_or_404(
            OpportunityFeedback,
            id=feedback_id,
            volunteer=volunteer
        )
        feedback.delete()

        return Response({
            "message": "Feedback deleted successfully"
        })

    @swagger_auto_schema(
        method='patch',
        operation_summary="Withdraw Application",
        operation_description="Volunteer can withdraw their application regardless of current status."
    )
    @action(detail=True, methods=['patch'])
    def withdraw_application(self, request, pk=None):

        user = request.user
        if not user or not user.is_authenticated or user.role != "volunteer":
            return Response({"error": "Unauthorized"}, status=401)

        volunteer = get_object_or_404(VolunteerProfile, user=user)
        application = get_object_or_404(
            Application,
            id=pk,
            volunteer=volunteer
        )

        if application.status == "withdrawn":
            return Response({"message": "Application already withdrawn"})

        application.status = "withdrawn"
        application.save()
        return Response({
            "message": "Application withdrawn successfully",
            "application_id": application.id,
            "status": application.status
        })
