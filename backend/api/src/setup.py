from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from config import DbConfig

# Setting up Flask
app = Flask(__name__, static_url_path='/public', static_folder='./public')
app.config['SQLALCHEMY_DATABASE_URI'] = DbConfig.generate_url()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resource={"*": {"origins": ["http://localhost:3000", "https://interview.cjjeon.com"]}})

# Setting up database
db = SQLAlchemy(app)
