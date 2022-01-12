import logging

from ariadne import convert_kwargs_to_snake_case

from dao.company_dao import get_company_descriptions_by_user, create_company_description_by_user, get_companies_by_name
from logger import function_time_logging
from model.models import GraphQLResolveInfo

logger = logging.getLogger(__name__)


@function_time_logging
@convert_kwargs_to_snake_case
def query_search_companies(*_, filter_name: str):
    if filter_name == '':
        return {
            'companies': []
        }

    companies = get_companies_by_name(filter_name)
    return {
        'companies': [company.to_dict() for company in companies]
    }


@function_time_logging
def query_company_descriptions(_, info: GraphQLResolveInfo):
    user = info.context.user
    if user is None:
        raise PermissionError("Unable to find the user information")

    company_descriptions = get_company_descriptions_by_user(user.user_id)
    return [company_description.to_dict() for company_description in company_descriptions]


@function_time_logging
def mutation_create_company_description(_, info: GraphQLResolveInfo, name: str, description: str):
    user = info.context.user
    if user is None:
        raise PermissionError("Unable to find the user information")

    company_description = create_company_description_by_user(name, description, user.user_id)

    return {
        'company_description': company_description.to_dict()
    }
