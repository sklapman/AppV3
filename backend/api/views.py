from django.shortcuts import render
from rest_framework import viewsets
from .models import RetirementGoal, FinancialSavingGoal, DebtRepaymentGoal, PersonalGoal
from .serializers import RetirementGoalSerializer, FinancialSavingGoalSerializer, DebtRepaymentGoalSerializer, PersonalGoalSerializer
from rest_framework.response import Response
from rest_framework import status
import logging
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

logger = logging.getLogger(__name__)

class BaseGoalViewSet(viewsets.ModelViewSet):
    def create(self, request, *args, **kwargs):
        logger.debug(f"Received data: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            logger.error(f"Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        logger.info(f"Goal created successfully: {serializer.data}")
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class RetirementGoalViewSet(BaseGoalViewSet):
    queryset = RetirementGoal.objects.all()
    serializer_class = RetirementGoalSerializer

class FinancialSavingGoalViewSet(BaseGoalViewSet):
    queryset = FinancialSavingGoal.objects.all()
    serializer_class = FinancialSavingGoalSerializer

class DebtRepaymentGoalViewSet(BaseGoalViewSet):
    queryset = DebtRepaymentGoal.objects.all()
    serializer_class = DebtRepaymentGoalSerializer

class PersonalGoalViewSet(BaseGoalViewSet):
    queryset = PersonalGoal.objects.all()
    serializer_class = PersonalGoalSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        logger.debug(f"Registering user: {username}")
        if User.objects.filter(username=username).exists():
            logger.error(f"Username already taken: {username}")
            return Response({'detail': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.create_user(username=username, password=password)
            logger.info(f"User registered successfully: {username}")
            return Response({'detail': 'Registration successful'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error registering user: {e}")
            return Response({'detail': 'Registration error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Create your views here.
