from typing import Optional, List

from ariadne import convert_kwargs_to_snake_case

from dao.experience_dao import create_experience, get_experiences, get_experience
from dao.role_dao import create_or_get_skills
from logger import function_time_logging
from model.models import GraphQLResolveInfo


@function_time_logging
def query_experience(_, info: GraphQLResolveInfo, id: int):
    user = info.context.user

    experience = get_experience(id, user.user_id)

    if experience is None:
        return {}

    return experience.to_dict()


@function_time_logging
@convert_kwargs_to_snake_case
def query_experiences(_, info: GraphQLResolveInfo, company_description_id: Optional[int] = None,
                      role_id: Optional[int] = None):
    user = info.context.user

    experiences = get_experiences(user.user_id, company_description_id, role_id)
    return [experience.to_dict() for experience in experiences]


@function_time_logging
def mutation_create_experience(_, info: GraphQLResolveInfo, summary: str, situation: str, action: str, outcome: str,
                               skills: List[str]):
    user = info.context.user

    skills = create_or_get_skills(skills)

    experience = create_experience(user.user_id, summary, situation, action, outcome, skills)

    return {
        'experience': experience.to_dict()
    }
