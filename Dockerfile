FROM python:3.7

#install python dependencies
RUN apt-get update && apt-get install -y --no-install-recommends gcc
RUN pip3 install --no-cache-dir --trusted-host pypi.python.org pipenv
COPY Pipfile* ./
RUN pipenv install --deploy --ignore-pipfile
COPY backend backend

# install js dependencies
RUN apt-get -y install curl \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash \
  && apt-get install nodejs
COPY frontend frontend
WORKDIR /frontend 
RUN npm install

# build frontend 
RUN npm run build
WORKDIR /frontend/build
RUN mkdir root && mv *.json root
RUN mkdir /backend/staticfiles

# run django production
WORKDIR /
RUN DJANGO_SETTINGS_MODULE=backend.production \
  SECRET_KEY=somethingsupersecret \
  pipenv run python3 backend/manage.py collectstatic --noinput 

EXPOSE $PORT
CMD pipenv run python3 backend/manage.py runserver 0.0.0.0:$PORT
