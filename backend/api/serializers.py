from rest_framework import serializers
from django.contrib.auth.models import User
from .models import NetWorthItem

class NetWorthItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NetWorthItem
        fields = [
            'id', 'name', 'description', 'category', 'value',
            'is_liability', 'target_value', 'target_date',
            'interest_rate', 'excluded', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def validate(self, data):
        """Ensure data integrity and prevent logical inconsistencies."""
        if data.get('target_value') and data.get('value'):
            if not data.get('is_liability') and data['value'] > data['target_value']:
                raise serializers.ValidationError(
                    {"value": "Current value cannot be greater than the target value for assets."}
                )
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
        return user