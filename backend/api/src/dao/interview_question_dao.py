from typing import Optional

from sqlalchemy import func

from db import InterviewQuestion
from logger import function_time_logging


@function_time_logging
def get_random_interview_question() -> Optional[InterviewQuestion]:
    return InterviewQuestion.query.order_by(func.random()).first()
