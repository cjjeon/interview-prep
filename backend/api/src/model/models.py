from dataclasses import dataclass


@dataclass
class Auth0UserModel:
    user_id: str
    email: str
    first_name: str
    last_name: str


@dataclass
class GraphQLContext:
    user: Auth0UserModel


@dataclass
class GraphQLResolveInfo:
    context: GraphQLContext
