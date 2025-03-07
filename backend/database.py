from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()  # Only one instance
bcrypt = Bcrypt()  # Only one instance
