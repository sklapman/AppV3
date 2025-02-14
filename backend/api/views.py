from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import NetWorthItem
from .serializers import NetWorthItemSerializer, UserSerializer

import logging

logger = logging.getLogger(__name__)

class NetWorthItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing net worth items.
    """
    queryset = NetWorthItem.objects.all()
    serializer_class = NetWorthItemSerializer
    permission_classes = [IsAuthenticated]

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer