from django.urls import include, path
from rest_framework import routers
from backend_app import views
from rest_framework.authtoken.views import obtain_auth_token

from backend_app.views import schema_view

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', obtain_auth_token),
    path('swagger/', schema_view),
]
