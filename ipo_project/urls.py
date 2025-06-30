from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView
from ipo_app.views import register_user
from ipo_app.views import get_user_info

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('ipo_app.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/userinfo/', get_user_info),
    path('api/register/', register_user),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
