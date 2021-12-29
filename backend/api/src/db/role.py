from datetime import datetime

from setup import db

Role_Skill = db.Table(
    'role_skill',
    db.Column('role_id', db.Integer, db.ForeignKey('role.id'), nullable=False),
    db.Column('skill_id', db.Integer, db.ForeignKey('skill.id'), nullable=False),
    db.Column('company_id', db.Integer, db.ForeignKey('company.id'), nullable=False)
)


class Role(db.Model):
    __tablename__ = 'role'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column('created_at', db.DateTime(timezone=True), default=datetime.utcnow())
    name = db.Column('name', db.String)

    skills = db.relationship('Skill', secondary=Role_Skill, lazy='joined', backref='role')
    company = db.relationship('Company', secondary=Role_Skill, lazy='joined', backref='role')

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
