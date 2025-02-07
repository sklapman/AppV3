from rest_framework import serializers
# ...existing imports...

class BaseGoalSerializer(serializers.ModelSerializer):
    deadline = serializers.DateField(required=False, allow_null=True)
    
    def to_internal_value(self, data):
        # Handle null or empty deadline explicitly
        if 'deadline' in data and not data['deadline']:
            data['deadline'] = None
        return super().to_internal_value(data)

    class Meta:
        abstract = True
        fields = ['id', 'title', 'description', 'target_amount', 'current_amount', 'deadline', 'created_at', 'updated_at']
        extra_kwargs = {
            'deadline': {'required': False, 'allow_null': True},
        }

# ...existing code...
