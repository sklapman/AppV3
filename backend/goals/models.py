from django.db import models
# ...existing imports...

class BaseGoal(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deadline = models.DateField(null=True, blank=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Ensure empty string deadlines are converted to None
        if self.deadline == '':
            self.deadline = None
        super().save(*args, **kwargs)

    class Meta:
        abstract = True

# ...existing code...