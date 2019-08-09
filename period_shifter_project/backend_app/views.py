from django.contrib.auth.models import Group
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from backend_app.models import PeriodPlan, DayPlan, YearPlan
from backend_app.permissions import IsOwner, IsOwnerOnly
from backend_app.serializers import UserSerializer, GroupSerializer, PeriodPlanSerializer, DayPlanSerializer
from rest_framework_swagger.views import get_swagger_view
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUser]
    # permission_classes = [IsOwner]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


schema_view = get_swagger_view(title='Pastebin API')


class PeriodPlanViewSet(viewsets.ModelViewSet):
    queryset = PeriodPlan.objects.all()
    serializer_class = PeriodPlanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return self.queryset
        else:
            queryset = self.queryset.filter(User=self.request.user)
        return queryset

    def perform_create(self, serializer):
        serializer.save(User=self.request.user)


class DayPlanViewSet(viewsets.ModelViewSet):
    queryset = DayPlan.objects.all()
    serializer_class = DayPlanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print(self.request.user)
        if self.request.user.is_superuser:
            return self.queryset
        else:
            queryset = self.queryset.filter(
                YearPlan=YearPlan.objects.get(PeriodPlan=PeriodPlan.objects.get(User=self.request.user)))
            return queryset
