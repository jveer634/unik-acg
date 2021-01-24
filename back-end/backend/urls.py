from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

User = get_user_model()

admin.site.site_header = "UNIK Admin"
admin.site.site_title = "UNIK Admin Portal"
admin.site.index_title = "Welcome to the control panel"
admin.site.site_url = None

admin.site.unregister(User)
admin.site.unregister(Group)



urlpatterns = [
    path('', include('products.urls')),
    path('', include('orders.urls')),

    path('admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
