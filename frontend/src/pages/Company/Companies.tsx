import React, { useEffect, useState } from "react"
import Loading from "../../component/loading/Loading"
import { useNavigate } from "react-router-dom"
import { COMPANY_CREATE_PAGE, CREATE_POSITION_PAGE } from "../../constant/routes"
import { Company } from "../../models/Company.model"
import { gql, useQuery } from "@apollo/client"
import { useAuth0 } from "@auth0/auth0-react"

const GET_COMPANIES = gql`
    query GetCompanies {
        companies {
            success
            errors
            companies {
                id
                name
                description
            }
        }
    }
`

const Companies: React.FC = () => {
    const { data, loading } = useQuery(GET_COMPANIES)

    const [companies, setCompanies] = useState<Company[]>([])

    const { isAuthenticated } = useAuth0()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                navigate(COMPANY_CREATE_PAGE.path)
            } else if (data && data.companies.success) {
                const c = data.companies.companies
                if (c.length > 0) {
                    setCompanies(c)
                } else {
                    navigate(COMPANY_CREATE_PAGE.path)
                }
            }
        }
    }, [isAuthenticated, data, loading, navigate])

    const goToCompany = (companyId: number) => {
        navigate(CREATE_POSITION_PAGE.path.replace(":companyId", companyId.toString()))
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={"flex flex-col justify-center items-center text-center gap-2"}>
            <div className={"text-lg"}>Companies that you applied in the past:</div>
            {companies.map((company, index) => {
                return (
                    <div
                        key={index}
                        className={"p-2 w-64 border-4 rounded-lg border-yellow-300 cursor-pointer"}
                        onClick={() => {
                            return company.id ? goToCompany(company.id) : null
                        }}
                    >
                        {company.name}
                    </div>
                )
            })}
            <div>Or</div>
            <div
                className={"p-2 w-64 border-4 rounded-lg border-yellow-300 cursor-pointer"}
                onClick={() => navigate(COMPANY_CREATE_PAGE.path)}
            >
                Interview with a new company
            </div>
        </div>
    )
}

export default Companies
