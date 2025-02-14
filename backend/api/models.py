from django.db import models
from django.core.validators import MinValueValidator


class NetWorthItem(models.Model):
    """Model for tracking assets and liabilities with goal capabilities."""

    class Category(models.TextChoices):
        # Asset Categories (Goals)
        EMERGENCY = "EMERGENCY", "Emergency Fund"
        HOME = "HOME", "Home Purchase"
        EDUCATION = "EDUCATION", "Education"
        RETIREMENT = "RETIREMENT", "Retirement"
        OTHER_SAVINGS = "OTHER_SAVINGS", "Other Savings"
        
        # Asset Categories (Non-Goals)
        CASH = "CASH", "Cash & Equivalents"
        INVESTMENTS = "INVESTMENTS", "Investments"
        REAL_ESTATE = "REAL_ESTATE", "Real Estate"
        VEHICLES = "VEHICLES", "Vehicles"
        
        # Liability Categories
        MORTGAGE = "MORTGAGE", "Mortgage"
        STUDENT_LOAN = "STUDENT_LOAN", "Student Loan"
        CAR_LOAN = "CAR_LOAN", "Car Loan"
        CREDIT_CARD = "CREDIT_CARD", "Credit Card"
        OTHER_DEBT = "OTHER_DEBT", "Other Debt"

    name = models.CharField(max_length=200, db_index=True)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(
        max_length=20, 
        choices=Category.choices,
        db_index=True
    )
    
    # Core financial fields
    value = models.DecimalField(
        max_digits=12, 
        decimal_places=2,
        help_text="Current value (positive for assets, negative for liabilities)"
    )
    is_liability = models.BooleanField(
        default=False,
        help_text="True if this is a debt/liability"
    )
    
    # Goal-related fields
    target_value = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Target value for this asset/liability"
    )
    target_date = models.DateField(
        null=True,
        blank=True,
        help_text="Target date to reach the goal"
    )
    interest_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Interest rate (for liabilities) or expected return rate (for investments)"
    )
    
    # Visibility controls
    excluded = models.BooleanField(
        default=False,
        help_text="Exclude from net worth calculations"
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Net Worth Item"
        verbose_name_plural = "Net Worth Items"

    def __str__(self):
        return f"{self.name} ({self.get_category_display()}): ${abs(self.value)}"

    def save(self, *args, **kwargs):
        # Ensure liabilities are stored as negative values
        if self.is_liability and self.value > 0:
            self.value = -self.value
        super().save(*args, **kwargs)

    @property
    def progress_percentage(self):
        """Calculate progress towards goal."""
        if not self.target_value:
            return None
        
        if self.is_liability:
            initial = abs(self.target_value)
            current = abs(self.value)
            return ((initial - current) / initial) * 100 if initial != 0 else 0
        else:
            return (self.value / self.target_value) * 100 if self.target_value != 0 else 0