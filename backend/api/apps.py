from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend.api'  # Ensure correct full path to the app
    verbose_name = "API Application"  # Optional: human-readable name