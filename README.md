# Nurdle Demo

Wordle wannabe runs from a docker container using simple POST request and response

## Contents
* [How to use](#how-to-use)
* [Requirements](#requirements)
* [Notes](#notes)

# How to use
#### Run in a Docker container or use venv.
<br>

### Docker container:
```bash
$ docker build -t image-name .

$ docker run -p 8000:8000 image-name
```
### venv:
```bash
$ python3 -m venv venv

$ source venv/bin/activate

# Install the main components

$ python -m pip install --upgrade pip

$ python -m pip install django

# Run the server server: 

$ python manage.py runserver
```
<br>

# Requirements:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

<br>

# Notes
