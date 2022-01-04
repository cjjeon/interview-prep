import datetime

from setup import db


class Company(db.Model):
    __tablename__ = 'company'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column('created_at', db.DateTime(timezone=True), default=datetime.datetime.utcnow())
    name = db.Column('name', db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }


class CompanyDescription(db.Model):
    __tablename__ = 'company_description'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column('created_at', db.DateTime(timezone=True), default=datetime.datetime.utcnow())
    description = db.Column('description', db.String, nullable=False)
    company_id = db.Column('company_id', db.Integer, db.ForeignKey('company.id'))
    user_id = db.Column('user_id', db.String, db.ForeignKey('user.id'))

    company = db.relationship('Company')
    user = db.relationship('User')
    roles = db.relationship('Role', secondary='company_description_role_skill')

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'company': self.company.to_dict(),
        }
