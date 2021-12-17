from typing import List

from db import CompanyDescription


def get_companies_by_user(user_id: str) -> List[CompanyDescription]:
    companies = CompanyDescription.query.filter_by(user_id=user_id).all()

    return companies
