from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.decorators import authentication_classes, permission_classes
from django.shortcuts import render
from django.contrib.auth.models import User

from . import models
from . import serializers

# Create your views here.



class BinList(APIView):
    """
        View all existing bins in the system.

        * requires authentication.
    """

    # Open for testing purposes
    # https://www.django-rest-framework.org/api-guide/permissions/
    # permission_classes = []



    def get(self, request, format=None):
        """
            Return a list of bins known to the system.
        """
    
        bins = models.Bin.objects.all()
        serializer = serializers.BinListSerializer(bins, many = True)
        return Response(serializer.data)
    

    def post(self, request, format = None):
        """
            Create a new bin in the system.

        """
        
        bins = models.Bin.objects.all()
        serializer = serializers.BinListSerializer(bins, many = True)
        return Response(serializer.data)



# class Bin(APIView):
#     """
#         Access and modify single bins of the system.

#         * Require token authentication
#     """

#     # authentication_classes = [authentication.TokenAuthentication]
    
#     def get(self, request, format = None):
#         """
#             Return a specific bin.
#         """

#         print(request.data)
#         return Response(request.data)

        
#     def patch(self, request, format = None):
#         """
#             Update an existing bin.
#         """
#         pass


#     def delete(self, request, format = None):
#         """
#             Delete an existing bin.
#         """
#         pass



class BinTypeList(APIView):
    """
        View existing bint types.

        *Requires authentication.
    """

    # Enable in productive env
    permission_classes = []
    
    def get(self, request, format = None):
        """
            Return a list of all available bin types.
        """
        
        bin_types = models.BinType.objects.all()
        serializer = serializers.BinTypeListSerializer(bin_types, many = True)
        return Response(serializer.data)

    
    def post(self, request, format = None):
        """
            Create a new bin type in the system.
        """
        
        bin_types = models.BinType.objects.all()
        serializer = serializers.BinTypeListSerializer(bin_types, many = True)
        return Response(serializer.data)



# class BinType(APIView):
#     """ 
#         Handle access to single bin types.
#     """

#     def patch(self, request, format = None):
#         """
#             Update a specific bin type.
#         """
#         pass


#     def delete(self, request, format = None):
#         """
#             Delete a specific bin type.
#         """
#         pass



class DistrictList(APIView):
    """
        Access the districts.

    """

    # authentication_classes = [authentication.TokenAuthentication]
    permission_classes = []

    def get(self, request, format = None):
        """
            Return a list of all available districts.
        """
        districts = models.District.objects.all()
        serializer = serializers.DistrictListSerializer(districts, many = True)
        return Response(serializer.data)

    
    def post(self, request, format = None):
        """
            Create a new district.
        """
        districts = models.District.objects.all()
        serializer = serializers.DistrictListSerializer(districts, many = True)
        return Response(serializer.data)

    

# class District(APIView):
#     """
#         Access and modify single districts.

#     """

#     def get(self, request, format = None):
#         """
#             Get a single district.
#         """
#         pass


#     def patch(self, request, format = None):
#         """
#             Update a single district.
#         """
#         pass

    
#     def delete(self, request, format = None):
#         """
#             Delte a single district.
#         """
#         pass