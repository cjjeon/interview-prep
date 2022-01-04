import json
import logging
from functools import wraps
from urllib.request import urlopen

import requests
from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import request, jsonify, _request_ctx_stack
from jose import jwt
from werkzeug.exceptions import HTTPException

from api.setup import schema
from config import Auth0Config
from dao import get_user, create_user
from logger import setup_logging, function_time_logging
from model.models import Auth0UserModel, GraphQLContext
from setup import app, db

logger = logging.getLogger(__name__)


@app.errorhandler(Exception)
def handle_auth_error(ex):
    db.session.rollback()
    logger.error(ex)
    response = jsonify(message=str(ex))
    response.status_code = (ex.code if isinstance(ex, HTTPException) else 500)
    return response


def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise Exception({"code": "authorization_header_missing",
                         "description":
                             "Authorization header is expected"}, 401)

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise Exception({"code": "invalid_header",
                         "description":
                             "Authorization header must start with"
                             " Bearer"}, 401)
    elif len(parts) == 1:
        raise Exception({"code": "invalid_header",
                         "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise Exception({"code": "invalid_header",
                         "description":
                             "Authorization header must be"
                             " Bearer token"}, 401)

    token = parts[1]
    return token


def requires_auth(f):
    """Determines if the Access Token is valid
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen(f"{Auth0Config.AUTH0_DOMAIN}.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=Auth0Config.AUTH0_ALGORITHMS,
                    audience=Auth0Config.AUTH0_AUDIENCE,
                    issuer=Auth0Config.AUTH0_DOMAIN
                )
            except jwt.ExpiredSignatureError:
                raise Exception({"code": "token_expired",
                                 "description": "token is expired"}, 401)
            except jwt.JWTClaimsError:
                raise Exception({"code": "invalid_claims",
                                 "description":
                                     "incorrect claims,"
                                     "please check the audience and issuer"}, 401)
            except Exception:
                raise Exception({"code": "invalid_header",
                                 "description":
                                     "Unable to parse authentication"
                                     " token."}, 401)

            user = get_user(payload['sub'])

            if user is None:
                # After validating payload
                # Get a user information from Auth0 API
                response = requests.get(f"{Auth0Config.AUTH0_AUDIENCE}users/{payload['sub']}",
                                        headers={'Authorization': f'Bearer {token}'})
                response_json = response.json()
                create_user(response_json['user_id'], response_json['email'], response_json['given_name'],
                            response_json['family_name'])
                _request_ctx_stack.top.current_user = Auth0UserModel(
                    user_id=response_json['user_id'],
                    email=response_json['email'],
                    first_name=response_json['given_name'],
                    last_name=response_json['family_name']
                )
            else:
                _request_ctx_stack.top.current_user = Auth0UserModel(
                    user_id=user.id,
                    email=user.email,
                    first_name=user.first_name,
                    last_name=user.last_name
                )

            return f(*args, **kwargs)

        raise Exception({"code": "invalid_header",
                         "description": "Unable to find appropriate key"}, 401)

    return decorated


@app.route('/graphql', methods=['GET'])
def graphql_playground():
    return PLAYGROUND_HTML, 200


@app.route('/graphql', methods=['POST'])
@requires_auth
@function_time_logging
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=GraphQLContext(
            user=_request_ctx_stack.top.current_user
        )
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code


if __name__ == "__main__":
    setup_logging()
    logger.info("Flask Server has been started!!")
    app.run(host='0.0.0.0', port=5000)
