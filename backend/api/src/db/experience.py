from datetime import datetime

from setup import db


class Experience(db.Model):
    __tablename__ = 'experience'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column('created_at', db.DateTime(timezone=True), default=datetime.utcnow())
    summary = db.Column('summary', db.String, nullable=False)
    situation = db.Column('situation', db.String, nullable=False)
    action = db.Column('action', db.String, nullable=False)
    outcome = db.Column('outcome', db.String, nullable=False)
    user_id = db.Column('user_id', db.String, db.ForeignKey('user.id'))

    user = db.relationship('User')
    skills = db.relationship('Skill', secondary='experience_skill')

    def to_dict(self):
        return {
            'id': self.id,
            'summary': self.summary,
            'situation': self.situation,
            'action': self.action,
            'outcome': self.outcome,
            'user_id': self.user_id,
            'skills': [skill.to_dict() for skill in self.skills]
        }
