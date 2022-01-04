from datetime import datetime

from setup import db


class Role(db.Model):
    __tablename__ = 'role'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column('created_at', db.DateTime(timezone=True), default=datetime.utcnow())
    name = db.Column('name', db.String)

    skills = db.relationship("Skill", secondary='company_description_role_skill')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'skills': [skill.to_dict() for skill in self.skills]
        }


class Skill(db.Model):
    __tablename__ = 'skill'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column('created_at', db.DateTime(timezone=True), default=datetime.utcnow())
    name = db.Column('name', db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
