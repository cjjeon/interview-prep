from ariadne import ObjectType, load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers

from graphql_api.company_api import resolve_companies
from graphql_api.user_api import resolve_user

query = ObjectType("Query")
query.set_field('companies', resolve_companies)
query.set_field('user', resolve_user)

mutation = ObjectType("Mutation")

type_defs = load_schema_from_path("./graphql_api/schema.graphql")
schema = make_executable_schema(
    type_defs, query, mutation, snake_case_fallback_resolvers
)
