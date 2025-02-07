from django.db import models

class BaseGoal(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class RetirementGoal(BaseGoal):
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    retirement_age = models.IntegerField()
    annual_contribution = models.DecimalField(max_digits=12, decimal_places=2)
    expected_return_rate = models.DecimalField(max_digits=5, decimal_places=2)  # in percentage

    def __str__(self):
        return f"Retirement Goal: {self.title}"

class FinancialSavingGoal(BaseGoal):
    GOAL_TYPES = [
        ('EMERGENCY', 'Emergency Fund'),
        ('HOME', 'Home Purchase'),
        ('EDUCATION', 'Education'),
        ('OTHER', 'Other Savings'),
    ]
    goal_type = models.CharField(max_length=20, choices=GOAL_TYPES)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return f"Saving Goal: {self.title}"

class DebtRepaymentGoal(BaseGoal):
    DEBT_TYPES = [
        ('CREDIT_CARD', 'Credit Card'),
        ('STUDENT_LOAN', 'Student Loan'),
        ('MORTGAGE', 'Mortgage'),
        ('CAR_LOAN', 'Car Loan'),
        ('OTHER', 'Other Debt'),
    ]
    debt_type = models.CharField(max_length=20, choices=DEBT_TYPES)
    initial_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)  # in percentage

    def __str__(self):
        return f"Debt Goal: {self.title}"

class PersonalGoal(BaseGoal):
    GOAL_TYPES = [
        ('HEALTH', 'Health & Fitness'),
        ('CAREER', 'Career'),
        ('EDUCATION', 'Education'),
        ('LIFESTYLE', 'Lifestyle'),
        ('OTHER', 'Other'),
    ]
    goal_type = models.CharField(max_length=20, choices=GOAL_TYPES)
    progress = models.IntegerField(default=0)  # Store progress as percentage
    milestones = models.JSONField(default=list, blank=True)  # Store list of milestone objects

    def __str__(self):
        return f"Personal Goal: {self.title}"
