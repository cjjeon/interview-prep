"""Python Flask WebApp Auth0 integration example
"""
from functools import wraps
from os import environ as env
from urllib.parse import urlencode

from flask import jsonify, redirect, session, url_for
from werkzeug.exceptions import HTTPException

from config import AppConfig, Auth0Config
from dao.user_dao import get_user, create_user
from setup import app, auth0


@app.errorhandler(Exception)
def handle_auth_error(ex):
    response = jsonify(message=str(ex))
    response.status_code = (ex.code if isinstance(ex, HTTPException) else 500)
    return response


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if AppConfig.profile_key not in session:
            return redirect('/login')
        return f(*args, **kwargs)

    return decorated


@app.route('/callback')
def callback_handling():
    auth0.authorize_access_token()
    resp = auth0.get('userinfo')
    userinfo = resp.json()
    user = get_user(userinfo['sub'])
    if user is None:
        user = create_user(
            userinfo['sub'],
            userinfo['email'],
            userinfo['given_name'],
            userinfo['family_name'],
        )
    session[AppConfig.jwt_payload] = user.to_dict()

    return redirect('http://localhost:3000')


@app.route('/login')
def login():
    return auth0.authorize_redirect(redirect_uri=Auth0Config.callback_url)


@app.route('/logout')
def logout():
    session.clear()
    params = {'returnTo': url_for('login', _external=True), 'client_id': Auth0Config.client_id}
    return redirect(auth0.api_base_url + '/v2/logout?' + urlencode(params))


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=env.get('PORT', 5000))
