from rest_framework import serializers
from litter_collection.models import Bin, District, BinType

class BinListSerializer(serializers.Serializer):
    
    fill_state = serializers.FloatField()
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()


    def create(self, validated_data):
        """

        """
        return Bin.objects.create(**validate_data)


    def update(self, instance, validated_data):
        """

        """

        return instance;


class BinTypeListSerializer(serializers.Serializer):

    name = serializers.CharField()

    def create(self, validate_data):
        """

        """
        return BinType.objects.create(**validate_data)


    def update(self, instance, validate_data):
        """

        """
        return instance



class DistrictListSerializer(serializers.Serializer):

    name = serializers.CharField()
    plz = serializers.CharField()


    def create(self, validated_data):
        """

        """
        return District.objects.create(**validated_data)


    
    def update(self, instance, validated_data):
        """
            
        """

        return instance