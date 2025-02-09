from rest_framework import serializers
from .models import RetirementGoal, FinancialSavingGoal, DebtRepaymentGoal, PersonalGoal

class BaseGoalSerializer(serializers.ModelSerializer):
    """Abstract base serializer for all goal-related models."""

    def validate(self, data):
        """Ensure data integrity and prevent logical inconsistencies."""
        current_amount = data.get("current_amount", 0)
        target_amount = data.get("target_amount", 0)

        if current_amount is not None and target_amount is not None:
            if current_amount > target_amount:
                raise serializers.ValidationError(
                    {"current_amount": "Current amount cannot be greater than the target amount."}
                )

        if "deadline" not in data or not data["deadline"]:
            raise serializers.ValidationError(
                {"deadline": "Deadline is required."}
            )

        return data

    class Meta:
        abstract = True
        read_only_fields = ("created_at", "updated_at")


class RetirementGoalSerializer(BaseGoalSerializer):
    class Meta:
        model = RetirementGoal
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class FinancialSavingGoalSerializer(BaseGoalSerializer):
    class Meta:
        model = FinancialSavingGoal
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class DebtRepaymentGoalSerializer(BaseGoalSerializer):
    class Meta:
        model = DebtRepaymentGoal
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class PersonalGoalSerializer(BaseGoalSerializer):
    class Meta:
        model = PersonalGoal
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")