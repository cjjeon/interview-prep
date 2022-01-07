from typing import List, Optional

from db import Experience, Skill
from db.association import ExperienceSkill, CompanyDescriptionRoleSkill
from setup import db


def get_experience(id: int, user_id: str) -> Optional[Experience]:
    return Experience.query.filter(Experience.id == id).filter(Experience.user_id == user_id).first()


def get_experiences(
        user_id: str, company_description_id: Optional[int] = None, role_id: Optional[int] = None
) -> List[Experience]:
    skill_ids = []
    if company_description_id is not None:
        skill_query = Skill.query.join(CompanyDescriptionRoleSkill,
                                       Skill.id == CompanyDescriptionRoleSkill.skill_id).filter(
            CompanyDescriptionRoleSkill.company_description_id == company_description_id)

        if role_id is not None:
            skill_query = skill_query.filter(CompanyDescriptionRoleSkill.role_id == role_id)
        skills = skill_query.all()
        skill_ids = [skill.id for skill in skills]

    query = Experience.query.filter(Experience.user_id == user_id)
    if len(skill_ids) > 0:
        query = query.join(ExperienceSkill, Experience.id == ExperienceSkill.experience_id).filter(
            ExperienceSkill.skill_id.in_(skill_ids))

    return query.all()


def create_experience(user_id: str, summary: str, situation: str, action: str, outcome: str,
                      skills: List[Skill]) -> Experience:
    experience = Experience()
    experience.user_id = user_id
    experience.summary = summary
    experience.situation = situation
    experience.action = action
    experience.outcome = outcome
    experience.skills = skills

    db.session.add(experience)
    db.session.commit()

    return experience
