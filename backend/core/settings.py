import os
from dotenv import load_dotenv

load_dotenv()

# ...existing code...

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'writtenfinancialplan'),
        'USER': os.getenv('DB_USER', 'sethklapman'),
        'PASSWORD': os.getenv('DB_PASSWORD', ''),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# ...existing code...
