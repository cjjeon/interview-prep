from dao.company_dao import get_companies_by_user


def resolve_companies(_, info):
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
        companies = get_companies_by_user(user['id'])
        payload['companies'] = [company.to_dict() for company in companies]
    except Exception:
        payload['success'] = False
        payload['errors'] = ["Fail to fetch list of companies for the user"]

    return payload
