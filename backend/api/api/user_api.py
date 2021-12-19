from dao import get_user
from model.models import GraphQLResolveInfo


def resolve_user(_, info: GraphQLResolveInfo):
    u = info.context.user
    if u is None:
        return {
            'success': False,
            'errors': ['Require login. Please try again after login.']
        }

    payload = {
        'success': True,
    }

    try:
        user = get_user(u.user_id)
        payload['user'] = {
            'email': user.email,
            'first_name': user.email,
            'last_name': user.last_name,
        }
    except Exception:
        payload['success'] = False
        payload['errors'] = ["Fail to fetch user"]

    return payload
