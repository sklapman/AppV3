from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404
import logging

from .models import RetirementGoal, FinancialSavingGoal, DebtRepaymentGoal, PersonalGoal
from .serializers import (
    RetirementGoalSerializer,
    FinancialSavingGoalSerializer,
    DebtRepaymentGoalSerializer,
    PersonalGoalSerializer
)

logger = logging.getLogger(__name__)

class BaseGoalViewSet(viewsets.ModelViewSet):
    """Abstract ViewSet to handle Goal creation with optimized queries and logging."""

    def get_queryset(self):
        """Optimize query fetching to reduce database hits."""
        return self.queryset.select_related("user").only("id", "title", "created_at")

    def create(self, request, *args, **kwargs):
        logger.debug(f"Received data: {request.data}")
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)
            logger.info(f"Goal created successfully: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        logger.error(f"Validation errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RetirementGoalViewSet(BaseGoalViewSet):
    queryset = RetirementGoal.objects.select_related("user").only("id", "title", "target_amount", "created_at")
    serializer_class = RetirementGoalSerializer


class FinancialSavingGoalViewSet(BaseGoalViewSet):
    queryset = FinancialSavingGoal.objects.select_related("user").only("id", "title", "target_amount", "created_at")
    serializer_class = FinancialSavingGoalSerializer


class DebtRepaymentGoalViewSet(BaseGoalViewSet):
    queryset = DebtRepaymentGoal.objects.select_related("user").only("id", "title", "initial_amount", "current_amount", "created_at")
    serializer_class = DebtRepaymentGoalSerializer


class PersonalGoalViewSet(BaseGoalViewSet):
    queryset = PersonalGoal.objects.select_related("user").only("id", "title", "progress", "created_at")
    serializer_class = PersonalGoalSerializer


class RegisterView(APIView):
    """Handles user registration with optimized validation."""
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        logger.debug(f"Attempting to register user: {username}")

        if User.objects.filter(username=username).exists():
            logger.warning(f"Username already taken: {username}")
            return Response({"detail": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=username, password=password)
            logger.info(f"User registered successfully: {username}")
            return Response({"detail": "Registration successful"}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            logger.error(f"Database integrity error while registering user: {username}")
            return Response({"detail": "Database integrity error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            logger.exception(f"Unexpected error during registration: {e}")
            return Response({"detail": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)