from dao.company_dao import get_companies_by_user, create_company_by_user
from logger import function_time_logging
from model.models import GraphQLResolveInfo


@function_time_logging
def resolve_companies(_, info: GraphQLResolveInfo):
    user = info.context.user
    if user is None:
        return {
            'success': False,
            'errors': ['Require login. Please try again after login.']
        }

    payload = {
        'success': True,
    }

    try:
        companies = get_companies_by_user(user.user_id)
        payload['companies'] = [company.to_dict() for company in companies]
    except Exception:
        payload['success'] = False
        payload['errors'] = ["Fail to fetch list of companies for the user"]

    return payload


@function_time_logging
def resolve_create_company(_, info: GraphQLResolveInfo, name: str, description: str):
    user = info.context.user
    if user is None:
        return {
            'success': False,
            'errors': ['Require login. Please try again after login.']
        }

    try:
        company = create_company_by_user(name, description, user.user_id)
        payload = {
            'success': True,
            'company': company.to_dict()
        }
    except Exception:
        payload = {
            'success': False,
            'errors': ['Fail to create company']
        }

    return payload
