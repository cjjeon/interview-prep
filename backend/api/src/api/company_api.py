import logging
from typing import Optional

from ariadne import convert_kwargs_to_snake_case

from dao.company_dao import get_company_descriptions_by_user, create_company_description_by_user, get_companies_by_name
from db import CompanyDescription, Role
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
@convert_kwargs_to_snake_case
def query_company_description(_, info: GraphQLResolveInfo, company_description_id: int, role_id: int):
    company_description: Optional[CompanyDescription] = CompanyDescription.query \
        .filter(CompanyDescription.id == company_description_id) \
        .filter(CompanyDescription.user_id == info.context.user.user_id) \
        .filter(Role.id == role_id).first()

    if company_description is None:
        return {}

    return company_description.to_dict()


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
