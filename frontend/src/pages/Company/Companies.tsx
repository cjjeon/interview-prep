import React, { useEffect, useState } from "react"
import Loading from "../../component/loading/Loading"
import { useNavigate } from "react-router-dom"
import { COMPANY_CREATE_PAGE, CREATE_POSITION_PAGE } from "../../constant/routes"
import { gql, useQuery } from "@apollo/client"
import { useAuth0 } from "@auth0/auth0-react"
import { toast } from "react-toastify"

const GET_COMPANIES = gql`
    query GetCompanyDescriptions {
        companyDescriptions {
            companyDescriptions {
                id
                description
                company {
                    name
                }
            }
        }
    }
`

const Companies: React.FC = () => {
    const { data, loading, error } = useQuery(GET_COMPANIES)

    const [companyDescriptions, setCompanyDescriptions] = useState<
        {
            id: number
            description: string
            company: {
                name: string
            }
        }[]
    >([])

    const { isAuthenticated } = useAuth0()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading) {
            if (error) {
                toast.error(error.message)
            } else {
                if (!isAuthenticated) {
                    navigate(COMPANY_CREATE_PAGE.path)
                } else if (data && data.companyDescriptions) {
                    const c = data.companyDescriptions.companyDescriptions
                    if (c.length > 0) {
                        setCompanyDescriptions(c)
                    } else {
                        navigate(COMPANY_CREATE_PAGE.path)
                    }
                }
            }
        }
    }, [isAuthenticated, data, loading, navigate])

    const goToCompany = (companyId: number) => {
        navigate(CREATE_POSITION_PAGE.path.replace(":companyDescriptionId", companyId.toString()))
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={"flex flex-col justify-center items-center text-center gap-2"}>
            <div className={"text-lg"}>Companies that you applied in the past:</div>
            {companyDescriptions.map((companyDescription, index) => {
                return (
                    <div
                        key={index}
                        className={"p-2 w-64 border-4 rounded-lg border-yellow-300 cursor-pointer"}
                        onClick={() => {
                            return companyDescription.id ? goToCompany(companyDescription.id) : null
                        }}
                    >
                        {companyDescription.company.name}
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
