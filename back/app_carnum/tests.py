from django.contrib.auth.models import User
from django.db import IntegrityError
from django.test import TestCase

# Create your tests here.
from app_carnum.forms import CarNumberForm
from app_carnum.models import CarNumber


class CarNumTestCase(TestCase):
    user = None

    def setUp(self):
        self.user = User.objects.create(username="testuser")
        pass

    def test_number_validation(self):
        """
        Check number validaton by form class
        :return:
        """
        numbers = [
            ('', False),
            ('-', False),
            ('AA', False),
            ('AAA', False),
            ('AAA-', False),
            ('-123', False),
            ('aaa-01', False),
            ('azz-01X', False),
            ('BAD123', False),
            ('AZD-059', True),
        ]
        for i in numbers:
            self.assertEqual(CarNumberForm.is_valid_car_number(i[0]), i[1])

    def test_no_duplicates(self):
        """
        Checks that no duplicate number can be added, including uppercase-lowercase combinations
        :return:
        """
        number = "AAA-001"
        carnum = CarNumber.objects.create(number=number, user=self.user)
        duplicate_prevented = False
        try:
            CarNumber.objects.create(number=number.lower(), user=self.user)
        except IntegrityError as e:
            duplicate_prevented = True

        self.assertEqual(duplicate_prevented, True)