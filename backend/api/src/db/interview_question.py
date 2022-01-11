import enum

from setup import db


class InterviewType(enum.Enum):
    BEHAVIOURAL = 'BEHAVIOURAL'
    TECHNICAL = 'TECHNICAL'


class InterviewQuestion(db.Model):
    __tablename__ = 'interview_question'

    id = db.Column('id', db.Integer, primary_key=True, nullable=False)
    question = db.Column('question', db.String, nullable=False)
    tip = db.Column('tip', db.String, nullable=False)
    type = db.Column('type', db.Enum(InterviewType), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'tip': self.tip
        }
