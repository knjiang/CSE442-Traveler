import os
from .settings import *
import dj_database_url

SECRET_KEY = os.environ.get("SECRET_KEY")

DEBUG = True

ALLOWED_HOSTS = [os.environ.get("PRODUCTION_HOST")]
CSRF_TRUSTED_ORIGINS = [os.environ.get("PRODUCTION_HOST")]

INSTALLED_APPS.extend(["whitenoise.runserver_nostatic"])
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

TEMPLATES[0]["DIRS"] = [os.path.join(BASE_DIR, "../", "frontend", "build")]

STATICFILES_DIRS = [os.path.join(BASE_DIR, "../", "frontend", "build", "static")]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATIC_URL = "/static/"

WHITENOISE_ROOT = os.path.join(BASE_DIR, "../", "frontend", "build", "root")

# Postgres Database Connection (gets database URL and password under the hood)
DATABASES['default'] = dj_database_url.config(ssl_require=True)

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [os.environ.get("REDIS_URL","redis://localhost:6379")],
        },
    },
}
