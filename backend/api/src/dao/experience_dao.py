from typing import List, Optional

from db import Experience, Skill
from setup import db


def get_experiences(
        user_id: str, company_description_id: Optional[int] = None, role_id: Optional[int] = None
) -> List[Experience]:
    query = db.Query

    return []


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
