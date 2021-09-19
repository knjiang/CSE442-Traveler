FROM python:3.7

RUN apt-get update && apt-get install -y --no-install-recommends gcc
RUN pip3 install --no-cache-dir --trusted-host pypi.python.org pipenv
COPY Pipfile* ./
RUN pipenv install --deploy --ignore-pipfile
COPY backend backend

EXPOSE 8000
CMD pipenv run python3 backend/manage.py migrate && pipenv run python3 backend/manage.py runserver 0.0.0.0:8000
