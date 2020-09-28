from rest_framework import serializers
from litter_collection.models import Bin, District, BinType, TrashType



class BinSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bin
        fields = ["id", "fill_state", "latitude", "longitude", "bin_type", "trash_type", "bin_district"]


class BinTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = BinType
        fields = ["id", "name"]


class TrashTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = TrashType
        fields = ["id", "name"]


class DistrictSerializer(serializers.ModelSerializer):

    class Meta:
        model =  District
        fields =  ["id", "name", "plz"]