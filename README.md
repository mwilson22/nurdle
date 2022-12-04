# Nurdle Demo

Wordle wannabe that can run from a docker container. Javascript front end uses aynchronous and synchronous POST request and response to talk to the Python game engine via a Django server.

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
To serve from a Mac and view on a phone:

- Find your <span style="color:rgb(167, 130, 130)">mac-ip-address</span> using `ipconfig getifaddr en1`
- In settings.py add `ALLOWED_HOSTS = `['<span style="color:rgb(167, 130, 130)">mac-ip-address</span>'`, 'localhost', '127.0.0.1']`
- `python manage.py runserver 0.0.0.0:8000`
- On the phone go to <span style="color:rgb(167, 130, 130)">mac-ip-address</span>`:8000`