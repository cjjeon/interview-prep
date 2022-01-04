from typing import Optional, List

from sqlalchemy import func

from db import Role, Skill, CompanyDescription
from logger import function_time_logging
from setup import db


@function_time_logging
def get_role_by_name(name: str) -> Optional[Role]:
    return Role.query.filter(func.lower(Role.name) == name.lower()).first()


@function_time_logging
def get_roles_by_name(name: str, limit: int = 5) -> List[Role]:
    return Role.query.filter(Role.name.ilike(f"{name}%")).order_by(Role.name).limit(limit).all()


@function_time_logging
def create_role(name: str) -> Role:
    role = get_role_by_name(name)
    if role is None:
        role = Role()
        role.name = name
        db.session.add(role)
        db.session.commit()

    return role


@function_time_logging
def get_skill_by_name(name: str) -> Optional[Skill]:
    return Skill.query.filter(func.lower(Skill.name) == name.lower()).first()


@function_time_logging
def get_skills_by_name(name: str, limit: int = 5) -> List[Skill]:
    return Skill.query.filter(Skill.name.ilike(f"{name}%")).order_by(Skill.name).limit(limit).all()


@function_time_logging
def create_skills(skill_names: List[str]) -> List[Skill]:
    skills = []
    for skill_name in skill_names:
        skill = get_skill_by_name(skill_name)
        if skill is None:
            skill = Skill()
            skill.name = skill_name

            db.session.add(skill)
            db.session.commit()

        skills.append(skill)

    return skills


@function_time_logging
def create_role_skills(role_name: str, skill_names: List[str], company_description_id: int, user_id: str) -> Role:
    company_description: CompanyDescription = CompanyDescription.query.filter_by(id=company_description_id,
                                                                                 user_id=user_id).first()
    if company_description is None:
        raise Exception("Unable to find the company description")

    role = create_role(role_name)
    role_exists = False
    for company_description_role in company_description.roles:
        if company_description_role.name == role.name:
            role_exists = True
            role = company_description_role

    skills = create_skills(skill_names)
    for skill in skills:
        skill_exists = False
        for role_skill in role.skills:
            if skill.name == role_skill.name:
                skill_exists = True

        if not skill_exists:
            role.skills.append(skill)

    if not role_exists:
        company_description.roles.append(role)
    print("A")
    print([role.to_dict() for role in company_description.roles])

    db.session.commit()

    return role
