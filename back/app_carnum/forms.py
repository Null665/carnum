from django import forms
from app_carnum.models import CarNumber
import re


class CarNumberForm(forms.ModelForm):

    class Meta:
        model = CarNumber
        fields = ('user', 'number')

    def clean_number(self):
        number = self.cleaned_data['number']
        number = number.upper()
        if not self.is_valid_car_number(number):
            raise forms.ValidationError("Invalid format. Must be like AAA-000")
        return number

    @staticmethod
    def is_valid_car_number(number):
        number = number.upper()
        return re.match("^[A-Z]{3}-\d{3}$", number) is not None
