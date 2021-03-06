import logging
from typing import List, Optional

from ariadne import convert_kwargs_to_snake_case

from dao.role_dao import create_role_skills, get_roles_by_name, get_skills
from logger import function_time_logging
from model.models import GraphQLResolveInfo

logger = logging.getLogger(__name__)


@function_time_logging
@convert_kwargs_to_snake_case
def query_get_roles(_, info: GraphQLResolveInfo, filter_name: str):
    if filter_name == '':
        return {
            'roles': []
        }

    roles = get_roles_by_name(filter_name)
    return {
        'roles': [role.to_dict() for role in roles]
    }


@function_time_logging
@convert_kwargs_to_snake_case
def query_skills(_, info: GraphQLResolveInfo, filter_name: Optional[str] = None,
                 company_description_id: Optional[int] = None,
                 role_id: Optional[int] = None,
                 limit: int = 5):
    user = info.context.user

    skills = get_skills(user.user_id, filter_name, company_description_id, role_id, limit)
    return {
        'skills': [skill.to_dict() for skill in skills]
    }


@function_time_logging
@convert_kwargs_to_snake_case
def mutation_create_role(_, info: GraphQLResolveInfo, company_description_id: int, role: str, skills: List[str]):
    user = info.context.user

    r = create_role_skills(role_name=role, skill_names=skills, company_description_id=company_description_id,
                           user_id=user.user_id)
    return {
        'role_skill': r.to_dict()
    }
