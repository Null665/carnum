from django.contrib import admin
from django.contrib.admin import register

from .models import CarNumber
from .forms import CarNumberForm


@register(CarNumber)
class CarNumberAdmin(admin.ModelAdmin):
    model = CarNumber
    form = CarNumberForm

    list_display = ('number', 'user')
    search_fields = ('number', 'user')