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
    # The javascript client has sent us a 'guess'.
    guess = request.body.decode('UTF-8')
    letter_colours = ''

    # First check the guess to see if it is the code to initialize a new word
    if (guess == '0init'):
        init_word()
    else:
        letter_colours = assess_guess(guess)

    # Populate and send a reply
    data = {
        "is a word": word_in_file(guess),
        "correct": is_correct_guess(guess),
        "result": letter_colours,
        "current word": get_current_word()
    }
    return JsonResponse(data)
