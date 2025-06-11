from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "Bienvenido a la API de BeardStyle",
        "endpoints": {
            "admin": "/admin/",
            "api": "/api/"
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('barber_app.urls')),
    path('', api_root),  # Vista raíz
]
