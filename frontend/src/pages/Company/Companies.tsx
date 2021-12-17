import React, { useEffect, useState } from "react"
import Loading from "../../component/loading/Loading"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { COMPANY_CREATE_PAGE, CREATE_POSITION_PAGE } from "../../constant/routes"
import { Company } from "../../models/Company.model"
import { gql, useQuery } from "@apollo/client"

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
    const { data, client } = useQuery(GET_COMPANIES)

    const [companies, setCompanies] = useState<Company[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true
        if (!isLoggedIn) {
            navigate(COMPANY_CREATE_PAGE.path)
        }
        return () => {
            mounted = false
        }
    }, [isLoggedIn, navigate])

    const goToCompany = (companyId: number) => {
        // TODO Add method to go for company profile
        navigate(CREATE_POSITION_PAGE.path.replace(":companyId", companyId.toString()))
    }

    if (isLoading) {
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
