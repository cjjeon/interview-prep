from typing import List, Optional

from db import CompanyDescription, Company
from logger import function_time_logging
from setup import db


@function_time_logging
def get_companies_by_user(user_id: str) -> List[CompanyDescription]:
    companies = CompanyDescription.query.filter_by(user_id=user_id).all()

    return companies


@function_time_logging
def get_company_by_name(name: str) -> Optional[Company]:
    return Company.query.filter_by(name=name).first()


@function_time_logging
def create_company_by_user(name: str, description: str, user_id: str) -> CompanyDescription:
    company = get_company_by_name(name)
    if company is None:
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
