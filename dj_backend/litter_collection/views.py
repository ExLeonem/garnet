from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework import authentication, permissions, generics
from rest_framework.decorators import authentication_classes, permission_classes
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.contrib.auth.models import User

import copy
from . import models
from . import serializers
from .utils.urls import get_hateoas, fill_template


class BinList(APIView):
    """
        View all existing bins in the system.

        * requires authentication.
    """

    # Open for testing purposes
    # https://www.django-rest-framework.org/api-guide/permissions/
    permission_classes = (permissions.AllowAny,)



    def get(self, request, format=None):
        """
            Return a list of bins known to the system.
        """

        FILL_STATE_THRESHOLD = 0.5
        bins = models.Bin.objects.all()

        # Query only those who are filled
        filled = False
        if "filled" in request.GET:
            filled = bool(request.GET['filled'])

            if filled:
                bins = bins.filter(fill_state__gte=FILL_STATE_THRESHOLD)

        # Query only for specific districts
        districts = []
        if "districts" in request.GET:
            district_values =request.GET["districts"].split(",") 
            districts = list(filter(lambda district_num: district_num != "", district_values))
            bins = bins.filter(bin_district__in=districts)
            


        serializer = serializers.BinSerializer(bins, many = True)

        _link_template = get_hateoas(request)
        for e in serializer.data:
            _template_copy = copy.deepcopy(_link_template)
            _links = fill_template(_template_copy, "bin", e["id"])
            e.update(_links)

        return Response(serializer.data)
    

    def post(self, request, format = None):
        """
            Create a new bin in the system.

        """
        
        serializer = serializers.BinSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            _link_template = get_hateoas(request)
            _links = fill_template(_link_template, "bin", data["id"])
            data.update(_links)

            return Response(data, status=status.HTTP_200_OK)

        # TODO: Error missing field? Bad Request
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)



class BinDetail(APIView):
    """
        Access and modify single bins of the system.

        * Require token authentication
    """

    
    # authentication_classes = [authentication.TokenAuthentication]

    def get_object(self, pk):
        return models.Bin.objects.get(pk=pk)


    
    def get(self, request, bin_id, format = None):
        """
            Return a specific bin.
        """

        instance = None
        serializer = None

        try:
            instance = self.get_object(bin_id)
            serializer = serializers.BinSerializer(instance, partial=False)
        
        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        _links = get_hateoas(request)
        data = serializer.data
        data.update(_links)
        return Response(data, status=status.HTTP_200_OK)

        
    def patch(self, request, bin_id, format = None):
        """
            Update an existing bin.
        """
        
        instance = None
        serializer = None

        try:
            instance = self.get_object(bin_id)
            serializer = serializers.BinSerializer(instance, data=request.data, partial=True)

        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        if serializer.is_valid():
            serializer.save()
            _links = get_hateoas(request)
            data = serializer.data
            data.update(_links)

            return Response(data, status=status.HTTP_200_OK)

        return Response({}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, bin_id, format = None):
        """
            Delete an existing bin.
        """
        
        instance = None
        serializer = None

        try:
            instance = self.get_object(bin_id)
            serializer = serializers.BinSerializer(instance, partial=False)

        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        _links = get_hateoas(request)
        data = serializer.data
        data.update(_links)
        instance.delete()
        return Response(data, status=status.HTTP_200_OK)



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
        serializer = serializers.BinTypeSerializer(bin_types, many = True)

        _link_template = get_hateoas(request)
        for e in serializer.data:
            template_copy = copy.deepcopy(_link_template)
            _links = fill_template(template_copy, "bin", e["id"])
            e.update(_links)

        return Response(serializer.data)

    
    def post(self, request, format = None):
        """
            Create a new bin type in the system.
        """

        serializer = serializers.BinTypeSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            _links = get_hateoas(request)
            data.update(_links)
            return Response(data, status=status.HTTP_201_CREATED)

        # TODO: Add custom error messages for 405, 406,409, 415
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)



class BinTypeDetail(APIView):
    """
        Modify/delete specific bin types.

    """
    permission_classes = []


    def get_object(self, pk):
        return models.BinType.objects.get(pk=pk)


    def get(self, request, pk, format = None):
        """
            Get specific bin type by id
        """

        instance = None
        serializer = None

        try:
            instance = self.get_object(pk)
            serializer = serializers.BinTypeSerializer(instance, data=request.data, partial=True)
        
        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        if serializer.is_valid():
            data = serializer.data
            _links = get_hateoas(request)
            data.update(_links)
            return Response(data, status=status.HTTP_200_OK)

        return Response({}, status=status.HTTP_200_OK)


    def patch(self, request, pk, format = None):
        """
            Update a specific bin type.
        """

        instance = None
        serializer = None

        try:
            instance = self.get_object(pk)
            serializer = serializers.BinTypeSerializer(instance, data=request.data, partial=True)
            
        except ObjectDoesNotExist:
            return Response({}, status = status.HTTP_404_NOT_FOUND)

        if serializer.is_valid():
            serializer.save()
            _links = get_hateoas(request)
            data = serializer.data
            data.update(_links)
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
            serializer = serializers.BinTypeSerializer(instance, partial=False)
        
        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        _links = get_hateoas(request)
        data = serializer.data
        data.update(_links)
        instance.delete()
        return Response(data, status=status.HTTP_200_OK)



class TrashTypeList(APIView):
    """
        Access to trash types.
    """

    permission_classes = []

    def get(self, request, format = None):

        objects = models.TrashType.objects.all()
        serializer = serializers.TrashTypeSerializer(objects, many = True)

        _link_template = get_hateoas(request)
        for e in serializer.data:
            _template_copy = copy.deepcopy(_link_template)
            _links = fill_template(_template_copy, "trash", e["id"])
            e.update(_links)

        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request, format=None):

        serializer = serializers.TrashTypeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            _links = get_hateoas(request)
            data = serializer.data
            data.update(_links)
            return Response(data, status=status.HTTP_200_OK)
        
        return Response({}, status=status.HTTP_400_BAD_REQUEST)



class TrashTypeDetail(APIView):

    permission_classes = []

    def get_object(self, pk):
        return models.TrashType.objects.get(pk=pk)


    def get(self, request, pk, format=None):

        instance = None
        serializer = None

        try:
            instance = self.get_object(pk)
            serializer = serializers.TrashTypeSerializer(instance, partial=True)        

        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        _links = get_hateoas(request)
        data = serializer.data
        data.update(_links)
        
        return Response(data, status=status.HTTP_200_OK)

    
    def patch(self, request, pk, format=None):
        
        instance = None
        serializer = None

        try:
            instance = self.get_object(pk)
            serializer = serializers.TrashTypeSerializer(instance, data=request.data, partial=True)

        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        
        if serializer.is_valid():
            serializer.save()
            _links = get_hateoas(request)
            data = serializer.data
            data.update(_links)
            return Response(data, status=status.HTTP_200_OK)

        return Response({}, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, pk, format=None):
        
        instance = None
        serializer = None

        try:
            instance = self.get_object(pk)
            serializer = serializers.TrashTypeSerializer(instance, partial=False)

        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        _links = get_hateoas(request)
        data = serializer.data
        data.update(_links)
        instance.delete()
        return Response(data, status=status.HTTP_200_OK)



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
        serializer = serializers.DistrictSerializer(districts, many = True)

        _link_template = get_hateoas(request)
        for e in serializer.data:
            _template_copy = copy.deepcopy(_link_template)
            _links = fill_template(_template_copy, "district", e["id"])
            e.update(_links)

        return Response(serializer.data)

    
    def post(self, request, format = None):
        """
            Create a new district.
        """

        serializer = serializers.DistrictSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            _links = get_hateoas(request)
            data = serializer.data
            data.update(_links)
            return Response(data, status = status.HTTP_201_CREATED)

        return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)



class DistrictDetail(APIView):
    """
        Access and modify single districts.

    """

    permission_classes = []

    def get_object(self, pk):
        return models.District.objects.get(pk=pk)


    def get(self, request, pk, format = None):
        """
            Get a single district.
        """

        instance = None
        serializer = None

        try:
            instance = self.get_object(pk)
            serializer = serializers.DistrictSerializer(instance, data=request.data, partial=True)

        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        
        if serializer.is_valid():
            _links = get_hateoas(request)
            data = serializer.data
            data.update(_links)
            return Response(data, status=status.HTTP_200_OK)

        return Response({}, status=status.HTTP_400_BAD_REQUEST)
        


    def patch(self, request, pk, format = None):
        """
            Update a single district.
        """
        
        instance = None
        serializer = None

        try:
            instance = self.get_object(pk)
            serializer = serializers.DistrictSerializer(instance, data = request.data, partial=True)

        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        if serializer.is_valid():
            serializer.save()
            _links = get_hateoas(request)
            data = serializer.data
            data.update(_links)
            return Response(data, status=status.HTTP_200_OK)

        return Response({}, status=status.HTTP_400_BAD_REQUEST)
        

    
    def delete(self, request, pk, format = None):
        """
            Delte a single district.
        """
        
        instance = None
        serializer = None

        try:
            instance = self.get_object(pk)
            serializer = serializers.DistrictSerializer(instance, partial=False)

        except ObjectDoesNotExist:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        _links = get_hateoas(request)
        data = serializer.data
        data.update(_links)
        instance.delete()
        return Response(data, status=status.HTTP_200_OK)



class Base(APIView):

    def get(self, request, format=None):
        """
            Return the base links.
        """

        _links = get_hateoas(request)
        return Response(_links, status=status.HTTP_200_OK)




class BaseTypes(APIView):
    """
        Return links for current types.

        * Requires authentication
    """

    def get(self, request, format=None):
        
        _links = get_hateoas(request)
        return Response(_links, status=status.HTTP_200_OK)


