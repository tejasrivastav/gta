import os

# *****************************
# Environment specific settings
# *****************************

# DO NOT use "DEBUG = True" in production environments
# DEBUG = True

# DO NOT use Unsecure Secrets in production environments
# Generate a safe one with:
#     python -c "import os; print repr(os.urandom(24));"
SECRET_KEY = 'the quick brown fox jumps over the lazy dog'

# SQLAlchemy settings
SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://root:lXVJ6o4EEA@megalith.cfvzt8h8xatg.ap-southeast-1.rds.amazonaws.com/humble'
SQLALCHEMY_TRACK_MODIFICATIONS = False    # Avoids a SQLAlchemy Warning

# Flask-Mail settings
# For smtp.gmail.com to work, you MUST set "Allow less secure apps" to ON in Google Accounts.
# Change it in https://myaccount.google.com/security#connectedapps (near the bottom).
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 587
MAIL_USE_SSL = False
MAIL_USE_TLS = True
MAIL_USERNAME = 'yourname@gmail.com'
MAIL_PASSWORD = 'password'

# Sendgrid settings
SENDGRID_API_KEY='place-your-sendgrid-api-key-here'

# Flask-User settings
USER_APP_NAME = 'Flask-User starter app'
USER_EMAIL_SENDER_NAME = 'Your name'
USER_EMAIL_SENDER_EMAIL = 'yourname@gmail.com'

ADMINS = [
    '"Admin One" <admin1@gmail.com>',
    ]
