from authlib.integrations.flask_client import OAuth
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from config import DbConfig, AppConfig, Auth0Config

# Setting up Flask
app = Flask(__name__, static_url_path='/public', static_folder='./public')
app.config['SQLALCHEMY_DATABASE_URI'] = DbConfig.generate_url()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = AppConfig.secret_key
app.debug = True
CORS(app, resource={"*": {"origins": ["http://localhost:3000"]}})

# Setting up database
db = SQLAlchemy(app)

oauth = OAuth(app)
auth0 = oauth.register(
    'auth0',
    client_id=Auth0Config.client_id,
    client_secret=Auth0Config.client_secret,
    api_base_url=Auth0Config.base_url,
    access_token_url=Auth0Config.base_url + '/oauth/token',
    authorize_url=Auth0Config.base_url + '/authorize',
    client_kwargs={
        'scope': 'openid profile email',
    },
)
