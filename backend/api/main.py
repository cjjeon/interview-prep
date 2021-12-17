from functools import wraps
from urllib.parse import urlencode

from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import redirect, request, jsonify, session
from werkzeug.exceptions import HTTPException

from config import AppConfig
from config import Auth0Config
from dao.user_dao import get_user, create_user
from graphql_api.setup import schema
from setup import auth0, app


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
    return redirect(Auth0Config.login_redirect_url)


@app.route('/login')
def login():
    return auth0.authorize_redirect(redirect_uri=Auth0Config.callback_url)


@app.route('/logout')
def logout():
    session.clear()
    params = {'returnTo': Auth0Config.logout_redirect_url, 'client_id': Auth0Config.client_id}
    return redirect(auth0.api_base_url + '/v2/logout?' + urlencode(params))


@app.route('/graphql', methods=['GET'])
def graphql_playground():
    print(session)
    return PLAYGROUND_HTML, 200


@app.route('/graphql', methods=['POST'])
def graphql_server():
    data = request.get_json()
    print(session)
    success, result = graphql_sync(
        schema,
        data,
        context_value={
            'user': session[AppConfig.jwt_payload] if AppConfig.jwt_payload in session else None
        }
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
