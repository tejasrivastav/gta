# __init__.py is a special Python file that allows a directory to become
# a Python package so it can be accessed using the 'import' statement.

from datetime import datetime
import os

from flask import Flask
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_httpauth import HTTPBasicAuth

from flask_cors import CORS

# Instantiate Flask extensions
db = SQLAlchemy()
auth = HTTPBasicAuth()
# mail = Mail()
migrate = Migrate()

"""Create a Flask application.
"""
# Instantiate Flask
app = Flask(__name__)

# Load common settings
app.config.from_object('app.settings')
# Load environment specific settings
app.config.from_object('app.local_settings')

# Setup Flask-SQLAlchemy
db.init_app(app)

# Setup Flask-Migrate
migrate.init_app(app, db)

# Setup CORS
CORS(app)

# Register blueprints
from .views import register_blueprints
register_blueprints(app)
