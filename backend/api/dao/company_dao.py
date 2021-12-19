from typing import List

from db import CompanyDescription, Company
from setup import db


def get_companies_by_user(user_id: str) -> List[CompanyDescription]:
    companies = CompanyDescription.query.filter_by(user_id=user_id).all()

    return companies


def create_company_by_user(name: str, description: str, user_id: str) -> CompanyDescription:
    company = Company()
    company.name = name

    db.session.add(company)
    db.session.commit()

    company_description = CompanyDescription()
    company_description.description = description
    company_description.user_id = user_id
    company_description.company_id = company.id

    db.session.add(company_description)
    db.session.commit()

    return company_description