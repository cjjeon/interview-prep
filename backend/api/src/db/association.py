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


class InterviewQuestionUserHistory(db.Model):
    __tablename__ = 'interview_question_user_history'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column('user_id', db.String, db.ForeignKey('user.id'))
    interview_question_id = db.Column('interview_question_id', db.Integer, db.ForeignKey('interview_question.id'))
    company_description_id = db.Column('company_description_id', db.Integer, db.ForeignKey('company_description.id'))
    role_id = db.Column('role_id', db.Integer, db.ForeignKey('role.id'))

    communication_score = db.Column('communication_score', db.Integer, nullable=True)
    confidence_score = db.Column('confidence_score', db.Integer, nullable=True)
    positivity_score = db.Column('positivity_score', db.Integer, nullable=True)
    video_location = db.Column('video_location', db.String, nullable=False)
