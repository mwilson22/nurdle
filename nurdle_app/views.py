from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

import sys  # nopep8
sys.path.append("nurdle_app/game")  # nopep8
from game import *  # nopep8


# Create your views here.


def index(request):
    return render(request, 'index.html', context={'text': 'Hello world'})


@csrf_exempt
def check_guess(request):
    guess = request.body.decode('UTF-8')
    letter_colours = ''

    if (guess == '0init'):
        init_word()
    else:
        letter_colours = mark_guess(guess)

    data = {
        "is a word": word_in_file(guess),
        "correct": correct_guess(guess),
        "result": letter_colours,
        "current word": get_current_word()
    }
    return JsonResponse(data)
