from django.dispatch import Signal

# Signal sent when a new user is registered
user_registered = Signal()

# Signal sent when a new opportunity is created
opportunity_created = Signal()

# Signal sent when an application status is updated
application_status_changed = Signal()

# Signal sent when a password reset OTP is requested
otp_requested = Signal()
