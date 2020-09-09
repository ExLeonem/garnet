from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.decorators import authentication_classes, permission_classes
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.contrib.auth.models import User

from . import models
from . import serializers
from .utils.urls import get_hateoas, get_hateoas_template


class BinList(APIView):
    """
        View all existing bins in the system.

        * requires authentication.
    """

    # Open for testing purposes
    # https://www.django-rest-framework.org/api-guide/permissions/
    permission_classes = []



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


    def __init__(self):
        self.hateos_links = {
            "_links": {
                "self":  {
                    "href": "api/bin/type"
                },
                "parent": {
                    "href": "api/bin"
                }
            }
        }


    def get(self, request, format = None):
        """
            Return a list of all available bin types.
        """

        hateoas = get_hateoas(request)
        print(hateoas)


        bin_types = models.BinType.objects.all()
        serializer = serializers.BinTypeSerializer(bin_types, many = True)
        return Response(serializer.data)

    
    def post(self, request, format = None):
        """
            Create a new bin type in the system.
        """

        serializer = serializers.BinTypeSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            links = get_hateoas(request)
            data.update(links)
            return Response(data, status=status.HTTP_201_CREATED)

        # TODO: Add custom error messages for 405, 406,409, 415
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)



class BinTypeDetail(APIView):
    """
        Modify/delete specific bin types.

    """
    permission_classes = []


    def __init__(self):
        self.hateos_links = {
            "_links": {
                "self":  {
                    "href": "api/bin/type"
                },
                "parent": {
                    "href": "api/bin"
                }
            }
        }


    def get_object(self, pk):
        return models.BinType.objects.get(pk=pk)


    def patch(self, request, pk, format = None):
        """
            Update a specific bin type.
        """

        instance = None
        serializer = None

        try:
            instance = self.get_object(pk)
            serializer = serializers.BinTypeSerializer(instance, data=request.data, partial=False)
            
        except ObjectDoesNotExist:
            return Response({}, status = status.HTTP_404_NOT_FOUND)


        hateoas = get_hateoas(request)
        print(hateoas)

        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            data.update(self.hateos_links)
            return Response(data, status = status.HTTP_200_OK)

        # TODO: Add custom error messages for 405, 406,409, 415
        return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format = None):
        """
            Delete a specific bin type.
        """
        
        instance = None
        serializer = None

        try:
            instance = self.get_object(pk)
            serializer = serializers.BinTypeSerializer(instance, partial = False)
        
        except ObjectDoesNotExist:
            return Response({}, status = status.HTTP_404_NOT_FOUND)

        data = serializer.data
        instance.delete()
        return Response(data, status = status.HTTP_200_OK)



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

        serializer = serializers.DistrictListSerializer(data = request.data)

        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)

        return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)



class DistrictDetail(APIView):
    """
        Access and modify single districts.

    """

    def get(self, request, format = None):
        """
            Get a single district.
        """
        pass


    def patch(self, request, format = None):
        """
            Update a single district.
        """
        pass

    
    def delete(self, request, format = None):
        """
            Delte a single district.
        """
        pass