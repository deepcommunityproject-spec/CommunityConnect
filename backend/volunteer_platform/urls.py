from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(
    openapi.Info(
        title="CommunityConnect API",
        default_version='v1',
        description="Session-based Volunteer & Organization API for CommunityConnect",
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('users/', include('users.urls')),
    path('organizers/', include('organizers.urls')),
    path('swagger/', schema_view.with_ui('swagger')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "CommunityConnect Admin"
admin.site.site_title = "CommunityConnect Admin Portal"
admin.site.index_title = "Welcome to CommunityConnect"
