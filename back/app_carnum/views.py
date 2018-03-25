from django.http import HttpResponseForbidden, JsonResponse, HttpResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from app_carnum.models import CarNumber
from app_carnum.serializers import CarNumberSerializer


def list_all(request):
    """
    Return all car plate numbers
    :param request:
    :return:
    """
    if request.method != 'GET':
        return HttpResponseForbidden()  # raise PermissionDenied ?

    carnums = CarNumberSerializer(CarNumber.objects.all(), many=True)
    return JsonResponse(carnums.data, safe=False)

#
# CRUD operations below
#


def create(request, *args):
    data = JSONParser().parse(request)
    serializer = CarNumberSerializer(data=data)
    if serializer.is_valid():
        obj = serializer.save()
        return JsonResponse(CarNumberSerializer(obj).data, safe=False)
    else:
        return HttpResponse(str(serializer.errors), status=201)


def read(request, id):
    serialzer = CarNumberSerializer(get_object_or_404(CarNumber, id=id))
    return JsonResponse(serialzer.data)


def update(request, id):
    obj = get_object_or_404(CarNumber, id=id)
    serializer = CarNumberSerializer(obj, JSONParser().parse(request))
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    else:
        return JsonResponse(serializer.errors, status=400)


def delete(request, id):
    get_object_or_404(CarNumber, id=id).delete()
    return JsonResponse(status=204)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@csrf_exempt  # FIXME: THIS IS BAD I GUESS BUT IDK WHAT TO DO YET
def item(request, id=None):
    """
    API endpoint for Car plate number CRUD operations
    :param request:
    :param id: CarNumber id. Not used for POST
    :return:
    """
    return {
        'GET': read,
        'POST': create,
        'PUT': update,
        'DELETE': delete
    }[request.method](request, id)