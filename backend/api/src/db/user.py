from sqlalchemy import Integer, String

from setup import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column('id', Integer, primary_key=True, nullable=False)
    email = db.Column('email', String, nullable=False)
    first_name = db.Column('first_name', String, nullable=False)
    last_name = db.Column('last_name', String, nullable=False)

    def __init__(self, id: str, email: str, first_name: str, last_name: str):
        self.id = id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name
        }
