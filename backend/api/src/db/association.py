from setup import db


class CompanyDescriptionRoleSkill(db.Model):
    __tablename__ = 'company_description_role_skill'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    company_description_id = db.Column('company_description_id', db.Integer, db.ForeignKey('company_description.id'))
    role_id = db.Column('role_id', db.Integer, db.ForeignKey('role.id'))
    skill_id = db.Column('skill_id', db.Integer, db.ForeignKey('skill.id'))

    __table_args__ = (db.UniqueConstraint(company_description_id, role_id, skill_id),)

    company_description = db.relationship('CompanyDescription', backref='company_description_association')
    role = db.relationship('Role', backref='role_association')
    skill = db.relationship('Skill', backref='skill_association')


class ExperienceSkill(db.Model):
    __tablename__ = 'experience_skill'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    experience_id = db.Column('experience_id', db.Integer, db.ForeignKey('experience.id'))
    skill_id = db.Column('skill_id', db.Integer, db.ForeignKey('skill.id'))

    __table_args__ = (db.UniqueConstraint(experience_id, skill_id),)

    experience = db.relationship('Experience')
    skill = db.relationship('Skill')
