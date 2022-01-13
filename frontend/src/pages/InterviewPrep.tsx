import React from "react"
import SimpleButton from "../component/buttons/SimpleButton"
import Collapsible from "../component/collapsibles/CollapsibleItem"
import PastExperience from "./PastExperience"
import { useNavigate, useParams } from "react-router-dom"
import { DASHBOARD_PAGE, MOCK_INTERVIEW_PAGE } from "../constant/routes"
import { gql, useQuery } from "@apollo/client"
import Loading from "../component/loading/Loading"

const GET_COMPANY_DESCRIPTION = gql`
    query ($companyDescriptionId: ID!, $roleId: ID!) {
        companyDescription(companyDescriptionId: $companyDescriptionId, roleId: $roleId) {
            company {
                name
            }
            roles {
                name
            }
        }
    }
`

interface GetCompanyDescription {
    companyDescription: {
        company: {
            name: string
        }
        roles: {
            name: string
        }[]
    }
}

const InterviewPrep: React.FC = () => {
    const navigate = useNavigate()
    const { companyDescriptionId, roleId } = useParams()
    const { data, loading } = useQuery<GetCompanyDescription>(GET_COMPANY_DESCRIPTION, {
        variables: {
            companyDescriptionId,
            roleId,
        },
    })

    if (!companyDescriptionId || !roleId) {
        navigate(DASHBOARD_PAGE.path)
        return null
    }

    if (loading || !data || data.companyDescription.roles.length === 0) return <Loading />

    return (
        <div className={"flex flex-col gap-10"}>
            <div>
                <h1 className={"text-xl leading-6 font-medium text-gray-900"}>Interview Preparation</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {data.companyDescription.company.name} - {data.companyDescription.roles[0].name}
                </p>
            </div>
            <div className={"bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl"}>
                <Collapsible
                    items={[
                        {
                            title: "Review Past Experience",
                            subtitle:
                                "Before doing interview, it's important to go over your past experience that's related to the skill required for the job. Most likely, you will use these templates during the interview to answer some of interview questions.",
                            detail: <PastExperience />,
                        },
                        {
                            title: "Mock InterviewPrep",
                            detail: (
                                <div className={"flex flex-col gap-3 p-3"}>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Often, we do not know how we answer and act during the interview. This feature
                                        is for you to analyze yourself during the interview.
                                    </p>
                                    <div className={"flex justify-center"}>
                                        <SimpleButton
                                            label={"Start Mock Interview!"}
                                            onClick={() =>
                                                navigate(
                                                    MOCK_INTERVIEW_PAGE.path
                                                        .replace(":companyDescriptionId", companyDescriptionId)
                                                        .replace(":roleId", roleId)
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ),
                        },
                        { title: "Tips Before The InterviewPrep", detail: <div>Tip Before Interview Detail</div> },
                    ]}
                />
            </div>
        </div>
    )
}

export default InterviewPrep
