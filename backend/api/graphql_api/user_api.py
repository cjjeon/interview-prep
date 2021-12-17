from dao import get_user


def resolve_user(_, info):
    user = info.context['user']
    if user is None:
        return {
            'success': False,
            'errors': ['Require login. Please try again after login.']
        }

    payload = {
        'success': True,
    }

    try:
        user = get_user(user['id'])
        payload['user'] = {
            'email': user.email,
            'firstName': user.first_name,
            'lastName': user.last_name
        }
    except Exception:
        payload['success'] = False
        payload['errors'] = ["Fail to fetch user"]

    return payload
