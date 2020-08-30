from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.shortcuts import render
from django.contrib.auth.models import User
# Create your views here.



class BinList(APIView):
    """
        View all existing bins in the system.

        * requires authentication.
    """

    def get(self, request, format = None):
        """
            Return a list of bins known to the system.
        """
        pass
    

    def post(self, request, format = None):
        """
            Create a new bin in the system.

        """
        pass



class Bin(APIView):
    """
        Access and modify single bins of the system.

        * Require token authentication
    """

    authentication_classes = [authentication.TokenAuthentication]
    
    def get(self, request, format = None):
        """
            Return a specific bin.
        """
        pass

        
    def patch(self, request, format = None):
        """
            Update an existing bin.
        """
        pass


    def delete(self, request, format = None):
        """
            Delete an existing bin.
        """
        pass



class BinTypeList(APIView):
    """
        View existing bint types.

        *Requires authentication.
    """
    
    def get(self, request, format = None):
        """
            Return a list of all available bin types.
        """
        pass

    
    def post(self, request, format = None):
        """
            Create a new bin type in the system.
        """
        pass



class BinType(APIView):
    """ 
        Handle access to single bin types.
    """

    def patch(self, request, format = None):
        """
            Update a specific bin type.
        """
        pass


    def delete(self, request, format = None):
        """
            Delete a specific bin type.
        """
        pass



class DistrictList(APIView):
    """
        Access the districts.

    """

    authentication_classes = [authentication.TokenAuthentication]


    def get(self, request, format = None):
        """
            Return a list of all available districts.
        """
        pass

    
    def post(self, request, format = None):
        """
            Create a new district.
        """
        pass

    

class District(APIView):
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