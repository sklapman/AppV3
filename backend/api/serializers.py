from rest_framework import serializers
from .models import RetirementGoal, FinancialSavingGoal, DebtRepaymentGoal, PersonalGoal

class BaseGoalSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if hasattr(self.Meta.model, 'current_amount') and hasattr(self.Meta.model, 'target_amount'):
            if data.get('current_amount', 0) > data.get('target_amount', 0):
                raise serializers.ValidationError(
                    {"current_amount": "Current amount cannot be greater than target amount"}
                )
        if not data.get('deadline'):
            raise serializers.ValidationError(
                {"deadline": "Deadline is required"}
            )
        return data

class RetirementGoalSerializer(BaseGoalSerializer):
    class Meta:
        model = RetirementGoal
        fields = '__all__'

class FinancialSavingGoalSerializer(BaseGoalSerializer):
    class Meta:
        model = FinancialSavingGoal
        fields = '__all__'

class DebtRepaymentGoalSerializer(BaseGoalSerializer):
    class Meta:
        model = DebtRepaymentGoal
        fields = '__all__'

class PersonalGoalSerializer(BaseGoalSerializer):
    class Meta:
        model = PersonalGoal
        fields = '__all__'
