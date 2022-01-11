from ariadne import ObjectType, load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers

from api.company_api import query_company_descriptions, mutation_create_company_description, query_search_companies
from api.experience_api import query_experiences, mutation_create_experience, query_experience
from api.interview_question_api import query_interview_question
from api.position_api import mutation_create_role, query_get_roles, query_skills
from api.user_api import resolve_user

query = ObjectType("Query")
query.set_field('searchCompanies', query_search_companies)
query.set_field('companyDescriptions', query_company_descriptions)
query.set_field('searchRoles', query_get_roles)
query.set_field('user', resolve_user)
query.set_field('skills', query_skills)
query.set_field('experience', query_experience)
query.set_field('experiences', query_experiences)
query.set_field('interviewQuestion', query_interview_question)

mutation = ObjectType("Mutation")
mutation.set_field('createCompanyDescription', mutation_create_company_description)
mutation.set_field('createRole', mutation_create_role)
mutation.set_field('createExperience', mutation_create_experience)

type_defs = load_schema_from_path("./api/schema.graphql")
schema = make_executable_schema(
    type_defs, query, mutation, snake_case_fallback_resolvers
)
