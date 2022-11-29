from django.shortcuts import render

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


# Create your views here.


def index(request):
    return render(request, 'index.html', context={'text': 'Hello world'})


@csrf_exempt
def check_guess(request):
    guess = request.body.decode('UTF-8')

    data = {
        "success": True,
        "received": guess,
        "result": []
    }
    return JsonResponse(data)
