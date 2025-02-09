from django.db import models


class BaseGoal(models.Model):
    """Abstract base model for all goal types."""
    title = models.CharField(max_length=200, db_index=True)
    description = models.TextField(blank=True, null=True)
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]  # Sorts by most recent first

    def __str__(self):
        return f"{self.__class__.__name__}: {self.title}"


class RetirementGoal(BaseGoal):
    """Model for Retirement Goals."""
    target_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    retirement_age = models.PositiveIntegerField()
    annual_contribution = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    expected_return_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)  # %

    def __str__(self):
        return f"Retirement Goal: {self.title} | Target: ${self.target_amount} | Age: {self.retirement_age}"


class FinancialSavingGoal(BaseGoal):
    """Model for Financial Savings Goals."""

    class GoalType(models.TextChoices):
        EMERGENCY = "EMERGENCY", "Emergency Fund"
        HOME = "HOME", "Home Purchase"
        EDUCATION = "EDUCATION", "Education"
        OTHER = "OTHER", "Other Savings"

    goal_type = models.CharField(max_length=20, choices=GoalType.choices, db_index=True)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Saving Goal: {self.title} | Type: {self.get_goal_type_display()} | Target: ${self.target_amount}"


class DebtRepaymentGoal(BaseGoal):
    """Model for Debt Repayment Goals."""

    class DebtType(models.TextChoices):
        CREDIT_CARD = "CREDIT_CARD", "Credit Card"
        STUDENT_LOAN = "STUDENT_LOAN", "Student Loan"
        MORTGAGE = "MORTGAGE", "Mortgage"
        CAR_LOAN = "CAR_LOAN", "Car Loan"
        OTHER = "OTHER", "Other Debt"

    debt_type = models.CharField(max_length=20, choices=DebtType.choices, db_index=True)
    initial_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)  # %

    def __str__(self):
        return f"Debt Goal: {self.title} | Type: {self.get_debt_type_display()} | Remaining: ${self.current_amount}"


class PersonalGoal(BaseGoal):
    """Model for Personal Development Goals."""

    class GoalType(models.TextChoices):
        HEALTH = "HEALTH", "Health & Fitness"
        CAREER = "CAREER", "Career"
        EDUCATION = "EDUCATION", "Education"
        LIFESTYLE = "LIFESTYLE", "Lifestyle"
        OTHER = "OTHER", "Other"

    goal_type = models.CharField(max_length=20, choices=GoalType.choices, db_index=True)
    progress = models.PositiveIntegerField(default=0)  # Store progress as percentage
    milestones = models.JSONField(default=list, blank=True)  # Store list of milestone objects

    def __str__(self):
        return f"Personal Goal: {self.title} | Type: {self.get_goal_type_display()} | Progress: {self.progress}%"