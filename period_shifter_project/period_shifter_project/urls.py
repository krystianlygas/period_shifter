from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers
from backend_app import views
from rest_framework.authtoken.views import obtain_auth_token
from backend_app.views import CustomObtainAuthToken

from backend_app.views import schema_view
from frontend_app.views import index_view

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'periodplan', views.PeriodPlanViewSet)
router.register(r'dayplan', views.DayPlanViewSet)
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.


urlpatterns = [
                  path('', include(router.urls)),
                  path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
                  path('api-token-auth/', CustomObtainAuthToken.as_view()),
                  path('swagger/', schema_view),
                  path('index/', index_view)
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
