import React, { useEffect, useState } from "react"
import Loading from "../../component/loading/Loading"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { COMPANY_CREATE_PAGE } from "../../constant/routes"
import { getCompanies } from "../../api/supabase"
import { toast } from "react-toastify"
import { Company } from "../../models/Company.model"

interface CompaniesProps {}

const Companies: React.FC<CompaniesProps> = () => {
    const [companies, setCompanies] = useState<Company[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(COMPANY_CREATE_PAGE.path)
        } else {
            getCompanies().then(({ data, error }) => {
                if (error) {
                    toast.error(error)
                } else {
                    if (data.length === 0) {
                        navigate(COMPANY_CREATE_PAGE.path)
                    } else {
                        setCompanies(data)
                        setIsLoading(false)
                    }
                }
            })
        }
    }, [isLoggedIn, navigate])

    const goToCompany = (companyId: number) => {
        // TODO Add method to go for company profile
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div
            className={"flex flex-col justify-center items-center text-center gap-2"}
        >
            <div className={"text-lg"}>
                List of companies that you have interviewed in the past.
            </div>
            {companies.map((company, index) => {
                return (
                    <div
                        key={index}
                        className={
                            "p-2 w-64 border-4 rounded-lg border-yellow-300 cursor-pointer"
                        }
                        onClick={() => {
                            return company.id ? goToCompany(company.id) : null
                        }}
                    >
                        {company.name}
                    </div>
                )
            })}
            <div
                className={
                    "p-2 w-64 border-4 rounded-lg border-yellow-300 cursor-pointer"
                }
                onClick={() => navigate(COMPANY_CREATE_PAGE.path)}
            >
                Interview with New Company!
            </div>
        </div>
    )
}

export default Companies
