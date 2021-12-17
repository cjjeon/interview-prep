from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import Blueprint, request, jsonify, session

from config import AppConfig
from graphql_api.setup import schema

graphql_page = Blueprint('graphql_page', __name__, url_prefix='/')


@graphql_page.route('/graphql', methods=['GET'])
def graphql_playground():
    return PLAYGROUND_HTML, 200


@graphql_page.route('/graphql', methods=['POST'])
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
