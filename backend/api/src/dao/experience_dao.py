from typing import List

from db import Experience


def create_experience(user_id: str, summary: str, situation: str, action: str, outcome: str,
                      skills: List[str]) -> Experience:
    skills = create_skills(skills)

    return
