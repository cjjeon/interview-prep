from dao.interview_question_dao import get_random_interview_question
from logger import function_time_logging


@function_time_logging
def query_interview_question(*_):
    interview_question = get_random_interview_question()
    return interview_question.to_dict()
