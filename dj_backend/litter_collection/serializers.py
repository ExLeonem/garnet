from rest_framework import serializers
from litter_collection.models import Bin, District, BinType, TrashType



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


class BinTypeListSerializer(serializers.ModelSerializer):

    class Meta:
        model = BinType
        fields = ["id", "name"]


class TrashTypeListSerializer(serializers.ModelSerializer):

    class Meta:
        model: TrashType
        fields = ["id", "name"]


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