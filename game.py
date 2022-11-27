import random
from display import *

GREEN = TextCols.OKGREEN
YELLOW = TextCols.WARNING
WHITE = TextCols.ENDC


def word_in_file(in_word):
    f = open('words.txt')

    word = in_word.lower()

    for line in f:
        if line[:-1] == word:
            return True

    return False


def get_random_word():
    f = open('words.txt')
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
    return word


word = get_random_word().upper()[:-1]
print(word)


for attempt in range(6):
    while True:
        guess = input(f"\nGuess {attempt+1}: ").upper()
        if len(guess) == 5:
            if word_in_file(guess):
                break
            else:
                print("Word not in list")
        else:
            print("5 letters")

    temp_word = list(word)

    if guess == word:
        print(GREEN + guess + WHITE)
        print("You win!")
        exit()

    letter_colours = [None] * 5

    for i in range(len(word)):
        # Correct letter correct place
        if guess[i] == word[i]:
            letter_colours[i] = GREEN
            temp_word[i] = ' '

    for i in range(len(word)):
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

    # Print the guess with the correct letter colours
    for i in range(len(word)):
        print(letter_colours[i] + guess[i] + WHITE, end='')
