from typing import Optional, List

from db import Role, Skill, Role_Skill
from setup import db


def get_role_by_name(name: str) -> Optional[Role]:
    return Role.query.filter_by(name=name).first()


def get_role_by_name_and_company_id(name: str, company_id: int) -> Optional[Role]:
    return Role.query.join(Role.company).join(Role.skills).filter_by(company_id=company_id).first()


def create_role(name: str) -> Role:
    role = get_role_by_name(name)
    if role is None:
        role = Role()
        role.name = name

        db.session.add(role)
        db.session.commit()

    return role


def get_skill_by_name(name: str) -> Optional[Skill]:
    return Skill.query.filter_by(name=name).first()


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


def create_role_skills(role_name: str, skill_names: List[str], company_id: int) -> Role:
    role = create_role(role_name)
    skills = create_skills(skill_names)

    for skill in skills:
        role_skill = Role_Skill()
        role_skill.role_id = role.id
        role_skill.skill_id = skill.id
        role_skill.company_id = company_id

        db.session.add(role_skill)

    db.session.commit()

    return get_role_by_name_and_company_id(role_name, company_id)
