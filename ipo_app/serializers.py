from rest_framework import serializers
from .models import IPO

class IPOSerializer(serializers.ModelSerializer):
    listing_gain = serializers.ReadOnlyField()
    current_return = serializers.ReadOnlyField()

    class Meta:
        model = IPO
        fields = '__all__'
