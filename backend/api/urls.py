from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Importing ViewSets
from .views import (
    RetirementGoalViewSet,
    FinancialSavingGoalViewSet,
    DebtRepaymentGoalViewSet,
    PersonalGoalViewSet,
    RegisterView
)

# DRF Router for ViewSets
router = DefaultRouter()
router.register(r'retirement-goals', RetirementGoalViewSet, basename='retirement-goal')
router.register(r'saving-goals', FinancialSavingGoalViewSet, basename='saving-goal')
router.register(r'debt-goals', DebtRepaymentGoalViewSet, basename='debt-goal')
router.register(r'personal-goals', PersonalGoalViewSet, basename='personal-goal')

# URL Patterns
urlpatterns = [
    path('', include(router.urls)),  # Includes all registered endpoints
    path('register/', RegisterView.as_view(), name='register'),

    # JWT Authentication Endpoints
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # DRF Browsable API Auth
    path('auth/', include('rest_framework.urls')),  # DRF login/logout views
]