import random


GREEN = '0'
YELLOW = '1'
WHITE = '2'


# Check if the word exists in the words file
def word_in_file(in_word):
    f = open('nurdle_app/game/words.txt')

    word = in_word.lower()

    for line in f:
        if line[:-1] == word:
            return True

    return False


def get_random_word():
    f = open('nurdle_app/game/words.txt')
    # Read in the file once and build a list of line offsets
    line_offset = []
    offset = 0

    for line in f:
        line_offset.append(offset)
        offset += len(line)

    f.seek(0)
    while True:
        # Skip to line n (with the first line being line 0)
        f.seek(line_offset[random.randint(1, sum(1 for line in f))])
        word = f.readline()
        if len(word) == 6:  # 5 letter words only
            break

    return word.upper()[:-1]


current_word = ''


def get_current_word():
    return current_word


def is_correct_guess(guess):
    if guess == current_word:
        return True

    return False


def assess_guess(guess):
    temp_word = list(current_word)

    if is_correct_guess(guess):
        letter_colours = GREEN * 5
        return letter_colours

    letter_colours = [None] * 5

    for i in range(len(current_word)):
        # Correct letter correct place
        if guess[i] == current_word[i]:
            letter_colours[i] = GREEN
            temp_word[i] = ' '

    for i in range(len(current_word)):
        # Correct letter wrong place
        if guess[i] in temp_word:
            letter_colours[i] = YELLOW
            # Remove this letter from temp_word
            for j in range(len(temp_word)):
                if temp_word[j] == guess[i]:
                    temp_word[j] = ' '
                    break

        # Letter not in word
        elif letter_colours[i] == None:
            letter_colours[i] = WHITE

    return letter_colours


def init_word():
    global current_word
    current_word = get_random_word()
