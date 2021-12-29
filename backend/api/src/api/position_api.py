import logging
from typing import List

from dao.role_dao import create_role_skills
from logger import function_time_logging
from model.models import GraphQLResolveInfo
from setup import db

logger = logging.getLogger(__name__)


@function_time_logging
def resolve_create_role(_, info: GraphQLResolveInfo, companyId: int, role: str, skills: List[str]):
    payload = {
        "success": True
    }

    try:
        r = create_role_skills(role_name=role, skill_names=skills, company_id=companyId)
        payload['role'] = r.to_dict()
    except Exception as e:
        logger.error(e)
        db.session.rollback()
        payload['success'] = False
        payload['errors'] = ["Fail to create role and skills"]

    return payload
