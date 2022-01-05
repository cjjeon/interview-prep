from typing import Optional

from ariadne import convert_kwargs_to_snake_case

from logger import function_time_logging
from model.models import GraphQLResolveInfo


@function_time_logging
@convert_kwargs_to_snake_case
def query_experiences(_, info: GraphQLResolveInfo, company_description_id: Optional[int], role_id: Optional[int]):
    return {
        'experiences': []
    }
