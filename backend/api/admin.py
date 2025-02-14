from django.contrib import admin
from .models import NetWorthItem

@admin.register(NetWorthItem)
class NetWorthItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'value', 'is_liability', 'target_value', 'target_date', 'excluded')
    list_filter = ('category', 'is_liability', 'excluded')
    search_fields = ('name', 'description')
    ordering = ('name',)

# Register your models here.
