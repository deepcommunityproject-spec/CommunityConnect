# Create your models here.
from django.db import models
from authentication.models import AuthUser
from django.core.validators import RegexValidator

phone_validator = RegexValidator(
    regex=r'^\+?\d{10,15}$',
    message="Enter a valid phone number (10-15 digits, optional +)."
)

class VolunteerProfile(models.Model):
    user = models.OneToOneField(AuthUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='volunteer/',
        default='default/avatar.png',
        blank=True
    )
    phone = models.CharField(max_length=15, validators=[phone_validator], blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class OpportunityFeedback(models.Model):
    opportunity = models.ForeignKey(
        'organizers.Opportunity',
        on_delete=models.CASCADE,
        related_name='feedbacks'
    )
    volunteer = models.ForeignKey(
        'users.VolunteerProfile',
        on_delete=models.CASCADE,
        related_name='opportunity_feedbacks'
    )
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        constraints = [
            models.UniqueConstraint(
                fields=['opportunity', 'volunteer'],
                name='unique_feedback_per_volunteer'
            )
        ]
        indexes = [
            models.Index(fields=['opportunity', '-created_at'])
        ]

    def __str__(self):
        return f"{self.volunteer.name} - {self.opportunity.title}"
