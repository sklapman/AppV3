# Generated by Django 5.1.1 on 2024-12-28 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_financialgoal_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='DebtRepaymentGoal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('deadline', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('debt_type', models.CharField(choices=[('CREDIT_CARD', 'Credit Card'), ('STUDENT_LOAN', 'Student Loan'), ('MORTGAGE', 'Mortgage'), ('CAR_LOAN', 'Car Loan'), ('OTHER', 'Other Debt')], max_length=20)),
                ('initial_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('current_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('interest_rate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('minimum_payment', models.DecimalField(decimal_places=2, max_digits=12)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FinancialSavingGoal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('deadline', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('goal_type', models.CharField(choices=[('EMERGENCY', 'Emergency Fund'), ('HOME', 'Home Purchase'), ('EDUCATION', 'Education'), ('OTHER', 'Other Savings')], max_length=20)),
                ('target_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('current_amount', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PersonalGoal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('deadline', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('goal_type', models.CharField(choices=[('HEALTH', 'Health & Fitness'), ('CAREER', 'Career'), ('EDUCATION', 'Education'), ('LIFESTYLE', 'Lifestyle'), ('OTHER', 'Other')], max_length=20)),
                ('progress', models.IntegerField(default=0)),
                ('milestones', models.JSONField(blank=True, default=list)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RetirementGoal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('deadline', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('target_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('current_amount', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('retirement_age', models.IntegerField()),
                ('annual_contribution', models.DecimalField(decimal_places=2, max_digits=12)),
                ('expected_return_rate', models.DecimalField(decimal_places=2, max_digits=5)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.DeleteModel(
            name='FinancialGoal',
        ),
    ]
