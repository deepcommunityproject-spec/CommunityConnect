from django.db import models
from authentication.models import AuthUser
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils import timezone

phone_validator = RegexValidator(
    regex=r'^\+?\d{10,15}$',
    message="Enter a valid phone number (10-15 digits, optional +)."
)

class OrganizationProfile(models.Model):
    user = models.OneToOneField(AuthUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='organization/',
        default='default/avatar.png',
        blank=True
    )
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=15, validators=[phone_validator], blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Opportunity(models.Model):
    organization = models.ForeignKey(OrganizationProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(default=timezone.now)
    total_slots = models.PositiveIntegerField(default=0)
    slots_filled = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def clean(self):
        if self.start_date and self.end_date:
            if self.end_date <= self.start_date:
                raise ValidationError("End date must be after start date.")

    @property
    def slots_remaining(self):
        return self.total_slots - self.slots_filled
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} - {self.organization.name}"

class Application(models.Model):
    volunteer = models.ForeignKey('users.VolunteerProfile', on_delete=models.CASCADE)
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=[('pending','pending'),('accepted','accepted'),('rejected','rejected')],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('volunteer', 'opportunity')

    def __str__(self):
        return f"{self.volunteer.name} → {self.opportunity.title} ({self.status})"
