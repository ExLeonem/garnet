from django.db import models


class Bin(models.Model):

    fill_state = models.FloatField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    class TrashType(models.IntegerChoices):
        PAPER = 1
        ORGANIC = 2

    trash_type = models.ForeignKey("TrashType", on_delete = models.PROTECT, default = 1)
    bin_type = models.ForeignKey("BinType", on_delete = models.PROTECT, default = 1)
    bin_district = models.ForeignKey("District", on_delete = models.PROTECT, default = 1)


class TrashType(models.Model):
    name = models.CharField(max_length = 100)


class BinType(models.Model):
    name = models.CharField(max_length = 100)

    

class District(models.Model):
    name = models.CharField(max_length = 100)
    plz = models.CharField(max_length = 10)
    # poly = models.PolygonField()
    