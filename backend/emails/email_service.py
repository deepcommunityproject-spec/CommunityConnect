from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings


import logging

logger = logging.getLogger(__name__)

# ---------------------------------------------------
# CORE SEND FUNCTION (Django Email API with SendGrid Backend)
# ---------------------------------------------------

def send_html_email(subject, template, context, recipient_list):

    html_content = render_to_string(template, context)

    try:
        email = EmailMultiAlternatives(
            subject=subject,
            body="",
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.DEFAULT_FROM_EMAIL],
            bcc=recipient_list,
        )
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)
        logger.info(f"Email sent successfully to {recipient_list}")

    except Exception as e:
        logger.error(f"Email Failure to {recipient_list}: {str(e)}", exc_info=True)


# ---------------------------------------------------
# 1️⃣ Registration Success Email
# ---------------------------------------------------

def send_registration_success_email(user):

    context = {
        "name": user.email,
    }

    send_html_email(
        subject="Welcome to Volunteer Platform",
        template="emails/registration_success.html",
        context=context,
        recipient_list=[user.email],
    )


# ---------------------------------------------------
# 2️⃣ Opportunity Created Email (Mass Email)
# ---------------------------------------------------

def send_opportunity_created_email(opportunity, volunteers):

    context = {
        "opportunity_title": opportunity.title,
        "location": opportunity.location,
        "start_date": opportunity.start_date,
    }

    recipient_list = [
        v.user.email for v in volunteers if v.user.email
    ]

    send_html_email(
        subject=f"New Opportunity: {opportunity.title}",
        template="emails/opportunity_created.html",
        context=context,
        recipient_list=recipient_list,
    )


# ---------------------------------------------------
# 3️⃣ Application Status Updated Email
# ---------------------------------------------------

def send_application_status_email(application):

    status = application.status.lower()

    context = {
        "opportunity_title": application.opportunity.title,
        "status": status.capitalize(),
        "status_class": status
    }

    send_html_email(
        subject="Application Status Updated",
        template="emails/application_status_update.html",
        context=context,
        recipient_list=[application.volunteer.user.email],
    )

# ---------------------------------------------------
# 4️⃣ OTP / Forgot Password Email
# ---------------------------------------------------

def send_otp_email(user, otp):

    context = {
        "otp": otp,
    }

    send_html_email(
        subject="Your Password Reset OTP",
        template="emails/otp_email.html",
        context=context,
        recipient_list=[user.email],
    )
