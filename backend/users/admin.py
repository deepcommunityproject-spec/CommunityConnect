from django.contrib import admin
from .models import VolunteerProfile, OpportunityFeedback

@admin.register(VolunteerProfile)
class VolunteerProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user')
    search_fields = ('name',)

@admin.register(OpportunityFeedback)
class OpportunityFeedbackAdmin(admin.ModelAdmin):
    list_display = ("id", "opportunity", "volunteer", "comment", "created_at")
    search_fields = ("comment", "volunteer__name", "opportunity__title")
    list_filter = ("created_at",)
