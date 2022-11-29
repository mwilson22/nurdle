FROM mcr.microsoft.com/devcontainers/python:3-bullseye

ENV PYTHONUNBUFFERED 1

# [Optional] If your requirements rarely change, uncomment this section to add them to the image.
# COPY requirements.txt /tmp/pip-tmp/
# RUN pip3 --disable-pip-version-check --no-cache-dir install -r /tmp/pip-tmp/requirements.txt \
#    && rm -rf /tmp/pip-tmp
RUN pip install --upgrade pip
RUN python -m pip install django
RUN mkdir -p /nurdle

COPY nurdle_app/ /nurdle/nurdle_app/
COPY nurdle_proj/ /nurdle/nurdle_proj/
COPY manage.py/ /nurdle/

WORKDIR "/nurdle"

EXPOSE 8000
ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
