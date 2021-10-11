# CSE 442 - Traveler

## Setting up

- [Python 3.7](https://www.python.org/getit/) is required to to run the core server
- [Pipenv](https://pipenv.readthedocs.io/en/latest/install/) is used for managing Python dependency packages
- [Node.js](https://nodejs.org/en/download/) and [NPM](https://www.npmjs.com/get-npm) are also needed for the front end.

### Python

1. Create Python virtual environment and install (dev-)dependency packages
   - This can be done with `pipenv install --dev`
   - The dependencies will be determined from the `Pipfile` file
2. Activate the virtual environment
   - This can be done with `pipenv shell`
   - This needs to be done every time you start development
3. Apply database migrations
   - This can be done with `python manage.py migrate`
   - By default, a SQLite database file called `db.sqlite3` will be used
   - This needs to be done initially, then again whenever database schema migrations are made
4. Create a superuser
   - This can be done with `python manage.py createsuperuser` (follow the prompts)
   - A superuser account grants you full (local) access to the website

### Node.js

1. Install dependencies
   - This can be done with `npm install`
2. Build static assets
   - This can be done with `npm run start`

## Usage

### Python virtual environment

- Activate the virtual environment with `pipenv shell`
  - This should be done any time you open a new terminal for development
- Deactivate the virtual environment with `deactivate`

### Django development server

- Start the server with `python manage.py runserver`
- Stop the server with Ctrl+C
