from typing import List, Optional

from sqlalchemy import func

from db import CompanyDescription, Company
from logger import function_time_logging
from setup import db


@function_time_logging
def get_companies_by_name(name: str, limit: int = 5) -> List[Company]:
    return Company.query.filter(Company.name.ilike(f"{name}%")).order_by(Company.name).limit(limit).all()


@function_time_logging
def get_company_descriptions_by_user(user_id: str) -> List[CompanyDescription]:
    company_descriptions = CompanyDescription.query.filter_by(user_id=user_id).all()
    return company_descriptions


@function_time_logging
def get_company_by_name(name: str) -> Optional[Company]:
    return Company.query.filter(func.lower(Company.name) == name.lower()).first()


@function_time_logging
def create_company_description_by_user(name: str, description: str, user_id: str) -> CompanyDescription:
    company = get_company_by_name(name)
    if company is None:
        company = Company()
        company.name = name.lower()

        db.session.add(company)
        db.session.commit()

    company_description = CompanyDescription()
    company_description.description = description
    company_description.user_id = user_id
    company_description.company = company

    db.session.add(company_description)
    db.session.commit()

    return company_description
