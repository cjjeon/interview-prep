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

    communication_score = db.Column('communication_score', db.Integer, default=2)
    confidence_score = db.Column('confidence_score', db.Integer, default=2)
    positivity_score = db.Column('positivity_score', db.Integer, default=2)
    video_location = db.Column('video_location', db.String, nullable=False)

    interview_question = db.relationship("InterviewQuestion")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'interview_question_id': self.interview_question_id,
            'company_description_id': self.company_description_id,
            'role_id': self.role_id,
            'communication_score': self.communication_score,
            'confidence_score': self.confidence_score,
            'positivity_score': self.positivity_score,
            'video_url': self.video_location,
            'question': self.interview_question.question
        }
