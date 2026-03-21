from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from authentication.models import AuthUser
from users.models import VolunteerProfile
from .models import OrganizationProfile, Opportunity, Application
from .serializers import OpportunitySerializer, ApplicationStatusSerializer, OrganizationProfileSerializer
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Q
from emails.signals import opportunity_created, application_status_changed


class OrganizerViewSet(ViewSet):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    @swagger_auto_schema(
        method='post',
        request_body=OpportunitySerializer,
        operation_summary="Create Opportunity",
        operation_description="Create a new opportunity under the logged-in organizer."
    )
    @action(detail=False, methods=['post'])
    def create_opportunity(self, request):
        user = request.user
        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        org = get_object_or_404(OrganizationProfile, user=user)

        serializer = OpportunitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        opportunity = serializer.save(
            organization=org, 
            is_active=True
        )

        volunteers = VolunteerProfile.objects.all()
        opportunity_created.send(sender=self.__class__, opportunity=opportunity, volunteers=volunteers)

        # Optional Change: return Response(serializer.data, status=201)
        return Response({"message": "Opportunity created"})

    @swagger_auto_schema(
        method='get',
        operation_summary="View Pending Applications",
        operation_description="Retrieve all pending applications for the organizer's opportunities."
    )
    @action(detail=False, methods=['get'])
    def pending_applications(self, request):

        user = request.user
        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        org = get_object_or_404(OrganizationProfile, user=user)

        apps = Application.objects.filter(
            opportunity__organization=org,
            status='pending',
            opportunity__end_date__gt=timezone.now()
        ).order_by('-created_at')

        data = [{
            "id": a.id,
            "volunteer_id": a.volunteer.id, 
            "volunteer": a.volunteer.name,
            "opportunity": a.opportunity.title,
            "status": a.status,
            "location": a.opportunity.location,
            "applied_at": a.created_at
        } for a in apps]

        return Response(data)

    @swagger_auto_schema(
        method='put',
        request_body=ApplicationStatusSerializer,
        operation_summary="Update Application Status",
        operation_description="Update the status of a specific application belonging to the organizer."
    )
    @action(detail=True, methods=['put'])
    def update_application(self, request, pk=None):
        user = request.user
        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        org = get_object_or_404(OrganizationProfile, user=user)

        app = Application.objects.filter(
            id=pk,
            opportunity__organization=org
        ).first()

        if not app:
            return Response({"error": "Not allowed"}, status=403)

        serializer = ApplicationStatusSerializer(
            app,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        if serializer.validated_data.get('status') == 'accepted':
            if app.opportunity.slots_filled >= app.opportunity.total_slots:
                return Response(
                    {"error": "No slots available"},
                    status=400
                )
        previous_status = app.status
        serializer.save()

        # If changed to accepted
        if previous_status != 'accepted' and app.status == 'accepted':
            opportunity = app.opportunity
            opportunity.slots_filled += 1
            opportunity.save()
        
        if previous_status == 'accepted' and app.status != 'accepted':
            opportunity = app.opportunity
            opportunity.slots_filled = max(0, opportunity.slots_filled - 1)
            opportunity.save()

        # Send email ONLY if status actually changed
        if previous_status != app.status:
            application_status_changed.send(sender=self.__class__, application=app)

        return Response({"message": "Application updated"})

    @swagger_auto_schema(
        method='get',
        operation_summary="Get Organization Profile",
        operation_description="Retrieve the logged-in organizer's profile details."
    )
    @swagger_auto_schema(
        method='put',
        request_body=OrganizationProfileSerializer,
        operation_summary="Update Organization Profile",
        operation_description="Update the logged-in organizer's profile information."
    )
    @action(detail=False, methods=['get', 'put'])
    def profile(self, request):
        user = request.user

        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        org = get_object_or_404(OrganizationProfile, user=user)

        # GET PROFILE
        if request.method == 'GET':
            return Response({
                "name": org.name,
                "email": org.user.email,
                "bio": org.bio,
                "image": org.image.url if org.image else None,
                "contact_email": org.contact_email,
                "contact_phone": org.contact_phone,
                "website": org.website,
                "address": org.address,
                "created_at": org.created_at
            })

        serializer = OrganizationProfileSerializer(
            org,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"message": "Profile updated"})

    @swagger_auto_schema(
        method='get',
        operation_summary="View Organization Application History",
        operation_description="Retrieve all applications received for the organizer's opportunities, ordered by latest first."
    )
    @action(detail=False, methods=['get'])
    def history(self, request):
        user = request.user
        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        org = get_object_or_404(OrganizationProfile, user=user)

        applications = Application.objects.filter(
        opportunity__organization=org).exclude(
            status='pending',
            opportunity__end_date__gt=timezone.now()
        ).order_by('-created_at')

        data = [{
            "id": a.id,
            "volunteer_id": a.volunteer.id, 
            "volunteer": a.volunteer.name,
            "opportunity": a.opportunity.title,
            "status": a.status,
            "location": a.opportunity.location,
            "end_date": a.opportunity.end_date,
            "applied_at": a.created_at
        } for a in applications]

        return Response(data)

    @swagger_auto_schema(
        method='get',
        operation_summary="View Volunteer Profile",
        operation_description="Retrieve profile details of any volunteer by ID."
    )
    @action(detail=True, methods=['get'], url_path='view-volunteer')
    def view_volunteer(self, request, pk=None):
        user = request.user
        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        volunteer = get_object_or_404(VolunteerProfile, id=pk)

        return Response({
            "id": volunteer.id, 
            "name": volunteer.name,
            "email": volunteer.user.email,
            "bio": volunteer.bio,
            "image": volunteer.image.url if volunteer.image else None,
            "phone": volunteer.phone,
            "created_at": volunteer.created_at
        })

    @swagger_auto_schema(
        method='put',
        request_body=OpportunitySerializer,
        operation_summary="Update Opportunity",
        operation_description="Update a specific opportunity belonging to the logged-in organizer."
    )
    @action(detail=True, methods=['put'])
    def update_opportunity(self, request, pk=None):

        user = request.user
        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        org = get_object_or_404(OrganizationProfile, user=user)

        opportunity = get_object_or_404(
            Opportunity,
            id=pk,
            organization=org
        )

        serializer = OpportunitySerializer(
            opportunity,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"message": "Opportunity updated"})

    @swagger_auto_schema(
        method='get',
        operation_summary="View My Opportunities",
        operation_description="Returns opportunities that are active and not expired."
    )
    @action(detail=False, methods=['get'])
    def my_opportunities(self, request):

        user = request.user
        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        org = get_object_or_404(OrganizationProfile, user=user)

        opportunities = Opportunity.objects.filter(
            organization=org,
            is_active=True,
            end_date__gte=timezone.now()
        ).order_by('-created_at')

        data = [{
            "id": o.id,
            "title": o.title,
            "description": o.description,
            "location": o.location,
            "start_date": o.start_date,
            "end_date": o.end_date,
            "total_slots": o.total_slots,
            "slots_filled": o.slots_filled,
            "created_at": o.created_at
        } for o in opportunities]

        return Response(data)

    @swagger_auto_schema(
        method='get',
        operation_summary="View Opportunity Detail",
        operation_description="Organizer can view full details of their own opportunity."
    )
    @action(detail=True, methods=['get'])
    def opportunity_detail(self, request, pk=None):

        user = request.user
        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        org = get_object_or_404(OrganizationProfile, user=user)

        # Fetch opportunity with related data in ONE go
        opportunity = Opportunity.objects.filter(
            id=pk,
            organization=org
        ).prefetch_related(
            "feedbacks__volunteer__user",
            "application_set__volunteer__user"
        ).select_related().first()

        if not opportunity:
            return Response({"error": "Not allowed"}, status=403)

        # Applications (already prefetched)
        applications = opportunity.application_set.all().order_by('-created_at')

        volunteers = [{
            "id": a.volunteer.id,
            "name": a.volunteer.name,
            "email": a.volunteer.user.email,
            "status": a.status,
            "applied_at": a.created_at
        } for a in applications]

        # Feedbacks (already prefetched)
        feedback_list = [{
            "id": f.id,
            "volunteer_id": f.volunteer.id,
            "name": f.volunteer.name,
            "email": f.volunteer.user.email,
            "comment": f.comment,
            "created_at": f.created_at
        } for f in opportunity.feedbacks.all()]

        return Response({
            "id": opportunity.id,
            "title": opportunity.title,
            "description": opportunity.description,
            "location": opportunity.location,
            "start_date": opportunity.start_date,
            "end_date": opportunity.end_date,
            "total_slots": opportunity.total_slots,
            "slots_filled": opportunity.slots_filled,
            "created_at": opportunity.created_at,
            "volunteers": volunteers,
            "feedbacks": feedback_list
        })

    @swagger_auto_schema(
        method='patch',
        operation_summary="Deactivate Opportunity",
        operation_description="Organizer can deactivate an opportunity instead of deleting it."
    )
    @action(detail=True, methods=['patch'])
    def deactivate_opportunity(self, request, pk=None):

        user = request.user
        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        org = get_object_or_404(OrganizationProfile, user=user)

        opportunity = get_object_or_404(
            Opportunity,
            id=pk,
            organization=org
        )

        opportunity.is_active = False
        opportunity.save()

        return Response({
            "message": "Opportunity deactivated successfully"
        })

    @swagger_auto_schema(
        method='get',
        operation_summary="Previous Opportunities",
        operation_description="Returns expired or manually deactivated opportunities."
    )
    @action(detail=False, methods=['get'])
    def previous_opportunities(self, request):

        user = request.user
        if not user or not user.is_authenticated or user.role != 'organizer':
            return Response({"error": "Unauthorized"}, status=401)

        org = get_object_or_404(OrganizationProfile, user=user)

        opportunities = Opportunity.objects.filter(
            organization=org
        ).filter(
            Q(is_active=False) |
            Q(end_date__lt=timezone.now())
        ).order_by('-created_at')

        data = [{
            "id": o.id,
            "title": o.title,
            "description": o.description,
            "location": o.location,
            "start_date": o.start_date,
            "end_date": o.end_date,
            "is_active": o.is_active,
            "created_at": o.created_at
        } for o in opportunities]

        return Response(data)
 