from django.contrib import admin
from .models import Bin, TrashType, BinType, District
# Register your models here.

admin.site.register(Bin)
admin.site.register(TrashType)
admin.site.register(BinType)
admin.site.register(District)