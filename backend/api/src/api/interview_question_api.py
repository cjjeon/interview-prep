from typing import Optional, List

from ariadne import convert_kwargs_to_snake_case
from werkzeug.datastructures import FileStorage

from dao.interview_question_dao import get_random_interview_question
from db.association import InterviewQuestionUserHistory
from logger import function_time_logging
from model.models import GraphQLResolveInfo
from setup import db
from util.file_manager import save_file, create_random_file_name


@function_time_logging
def query_interview_question(*_):
    interview_question = get_random_interview_question()
    return interview_question.to_dict()


@function_time_logging
def query_mock_interview(_, info: GraphQLResolveInfo, id: int):
    interview_question_user_history = InterviewQuestionUserHistory.query.filter_by(id=id) \
        .filter_by(user_id=info.context.user.user_id).first()
    if interview_question_user_history is None:
        return {}

    return interview_question_user_history.to_dict()


@function_time_logging
@convert_kwargs_to_snake_case
def query_mock_interviews(_, info: GraphQLResolveInfo, company_description_id=None, role_id=None):
    query = InterviewQuestionUserHistory.query \
        .filter(InterviewQuestionUserHistory.user_id == info.context.user.user_id)

    if company_description_id is not None:
        query = query.filter(InterviewQuestionUserHistory.company_description_id == company_description_id)

    if role_id is not None:
        query = query.filter(InterviewQuestionUserHistory.role_id == role_id)

    interview_question_user_histories: List[InterviewQuestionUserHistory] = query.all()

    return [interview_question_user_history.to_dict() for interview_question_user_history in
            interview_question_user_histories]


@function_time_logging
@convert_kwargs_to_snake_case
def mutation_update_mock_interview_score(_, info: GraphQLResolveInfo, id: int,
                                         communication_score: Optional[int] = None,
                                         confidence_score: Optional[int] = None,
                                         positivity_score: Optional[int] = None):
    interview_question_user_history: Optional[
        InterviewQuestionUserHistory] = InterviewQuestionUserHistory.query.filter_by(
        user_id=info.context.user.user_id).filter_by(id=id).first()

    if interview_question_user_history is None:
        raise Exception("Unable to find the mock interview")

    if communication_score is not None:
        interview_question_user_history.communication_score = communication_score

    if confidence_score is not None:
        interview_question_user_history.confidence_score = confidence_score

    if positivity_score is not None:
        interview_question_user_history.positivity_score = positivity_score
    db.session.commit()
    return True


@function_time_logging
@convert_kwargs_to_snake_case
def mutation_upload_mock_interview(_, info: GraphQLResolveInfo, company_description_id: int, role_id: int,
                                   interview_question_id: int, file: FileStorage):
    folder_path = "./videos"
    file_name = create_random_file_name()
    save_file(file, folder_path, file_name)

    interview_question_user_history = InterviewQuestionUserHistory()
    interview_question_user_history.user_id = info.context.user.user_id
    interview_question_user_history.interview_question_id = interview_question_id
    interview_question_user_history.company_description_id = company_description_id
    interview_question_user_history.role_id = role_id
    interview_question_user_history.video_location = file_name

    db.session.add(interview_question_user_history)
    db.session.commit()
    return interview_question_user_history.id
