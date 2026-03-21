from django.apps import AppConfig


class EmailsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'emails'

    def ready(self):
        import logging
        logger = logging.getLogger(__name__)
        try:
            import emails.receivers
            logger.info("Emails app signals registered successfully.")
        except Exception as e:
            logger.error(f"Failed to register emails signals: {e}", exc_info=True)
