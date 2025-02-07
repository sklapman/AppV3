from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RetirementGoalViewSet,
    FinancialSavingGoalViewSet,
    DebtRepaymentGoalViewSet,
    PersonalGoalViewSet,
    RegisterView
)

router = DefaultRouter()
router.register(r'retirement-goals', RetirementGoalViewSet)
router.register(r'saving-goals', FinancialSavingGoalViewSet)
router.register(r'debt-goals', DebtRepaymentGoalViewSet)
router.register(r'personal-goals', PersonalGoalViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
]
