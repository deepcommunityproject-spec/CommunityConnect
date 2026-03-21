from django.dispatch import receiver
from .signals import user_registered, opportunity_created, application_status_changed, otp_requested
from .email_service import (
    send_registration_success_email,
    send_opportunity_created_email,
    send_application_status_email,
    send_otp_email
)

import logging
logger = logging.getLogger(__name__)

@receiver(user_registered)
def handle_user_registration(sender, user, **kwargs):
    logger.info(f"Signal received: user_registered for {user.email}")
    try:
        send_registration_success_email(user)
    except Exception as e:
        logger.error(f"Signal Email Error (Registration): {str(e)}", exc_info=True)

@receiver(opportunity_created)
def handle_opportunity_creation(sender, opportunity, volunteers, **kwargs):
    logger.info(f"Signal received: opportunity_created for '{opportunity.title}'")
    try:
        send_opportunity_created_email(opportunity, volunteers)
    except Exception as e:
        logger.error(f"Signal Email Error (Opportunity Created): {str(e)}", exc_info=True)

@receiver(application_status_changed)
def handle_application_status_change(sender, application, **kwargs):
    logger.info(f"Signal received: application_status_changed for app ID {application.id}")
    try:
        send_application_status_email(application)
    except Exception as e:
        logger.error(f"Signal Email Error (Status Update): {str(e)}", exc_info=True)

@receiver(otp_requested)
def handle_otp_request(sender, user, otp, **kwargs):
    logger.info(f"Signal received: otp_requested for {user.email}")
    try:
        send_otp_email(user, otp)
    except Exception as e:
        logger.error(f"Signal Email Error (OTP): {str(e)}", exc_info=True)
