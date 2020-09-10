"""dj_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home') 
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path
from litter_collection.views import BinList, BinDetail, DistrictList, DistrictDetail, BinTypeList, BinTypeDetail, TrashTypeList, TrashTypeDetail



urlpatterns = [
    path(r'admin/', admin.site.urls),
    re_path(r'api/auth/', include('djoser.urls')),
    re_path(r'api/auth/', include('djoser.urls.jwt')),

    re_path(r'api/bin/(?P<bin_id>.+)', BinDetail.as_view()),
    re_path(r'api/bin', BinList.as_view()),

    re_path(r'api/types/bin/(?P<pk>.+)', BinTypeDetail.as_view()),
    re_path(r'api/types/bin', BinTypeList.as_view()),

    re_path(r'api/types/trash/(?P<pk>.+)', TrashTypeDetail.as_view()),
    re_path(r'api/types/trash', TrashTypeList.as_view()),

    re_path(r'api/district/(?P<pk>.+)', DistrictDetail.as_view()),
    re_path(r'api/district', DistrictList.as_view()),
]
