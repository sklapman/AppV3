# Generated by Django 4.2.11 on 2025-02-14 03:05

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NetWorthItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('category', models.CharField(choices=[('CASH', 'Cash & Equivalents'), ('INVESTMENTS', 'Investments'), ('REAL_ESTATE', 'Real Estate'), ('VEHICLES', 'Vehicles'), ('EMERGENCY', 'Emergency Fund'), ('RETIREMENT', 'Retirement'), ('OTHER_ASSET', 'Other Asset'), ('MORTGAGE', 'Mortgage'), ('STUDENT_LOAN', 'Student Loan'), ('CAR_LOAN', 'Car Loan'), ('CREDIT_CARD', 'Credit Card'), ('OTHER_DEBT', 'Other Debt')], db_index=True, max_length=20)),
                ('value', models.DecimalField(decimal_places=2, help_text='Current value (positive for assets, negative for liabilities)', max_digits=12)),
                ('is_liability', models.BooleanField(default=False, help_text='True if this is a debt/liability')),
                ('target_value', models.DecimalField(blank=True, decimal_places=2, help_text='Target value for this asset/liability', max_digits=12, null=True)),
                ('target_date', models.DateField(blank=True, help_text='Target date to reach the goal', null=True)),
                ('interest_rate', models.DecimalField(blank=True, decimal_places=2, help_text='Interest rate (for liabilities) or expected return rate (for investments)', max_digits=5, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('excluded', models.BooleanField(default=False, help_text='Exclude from net worth calculations')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Net Worth Item',
                'verbose_name_plural': 'Net Worth Items',
                'ordering': ['-created_at'],
            },
        ),
    ]
