from typing import Optional

from db import User
from setup import db


def get_user(id: str) -> Optional[User]:
    users = User.query.filter_by(id=id).all()
    if len(users) > 0:
        return users[0]
    return None


def create_user(id: str, email: str, first_name: str, last_name: str) -> User:
    user = User(
        id=id,
        email=email,
        first_name=first_name,
        last_name=last_name
    )

    db.session.add(user)
    db.session.commit()
    db.session.refresh(user)
    return user
