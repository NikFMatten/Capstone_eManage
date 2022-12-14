from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Address
from .serializers import AddressSerializer

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def list_of_addresses(request):
    if request.method == 'GET':
        addresses = Address.objects.all()
        serializer = AddressSerializer(addresses,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AddressSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Function for accessing table through PK
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def address_detail(request, pk):
    address = get_object_or_404(Address, pk=pk)
    if request.method == 'GET':
        serializer = AddressSerializer(address)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = AddressSerializer(address, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Function for accessing table through user id
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def user_address(request, user_id):
    address = get_object_or_404(Address, user__id=user_id)
    if request.method == 'GET':
        userAddress = Address.objects.filter(user__id=user_id)
        serializer = AddressSerializer(userAddress, many=True)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = AddressSerializer(address, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)