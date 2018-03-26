from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from app_carnum.forms import CarNumberForm
from .models import CarNumber


class CarNumberSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True, required=False)
    # number is always unique, no need for id
    number = serializers.CharField(max_length=7)
    user = serializers.CharField()

    def get_user(self, username):
        return get_object_or_404(User, username=username)

    def validate(self, attrs):
        if not CarNumberForm.is_valid_car_number(attrs.get('number','')):
            raise serializers.ValidationError("Invalid car number format. Must be like AAA-001")
        return attrs

    def create(self, validated_data):
        unique_fields = {
            'number': validated_data['number'],
            'user': self.get_user(validated_data['user']),
        }
        return CarNumber.objects.create(**unique_fields)

    def update(self, instance, validated_data):
        instance.number = validated_data.get('number', instance.number)
        instance.user = self.get_user(validated_data.get('user', instance.user.username))
        instance.save()
        return instance