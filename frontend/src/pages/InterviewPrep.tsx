import React from "react"
import Collapsible from "../component/collapsibles/CollapsibleItem"
import PastExperience from "./PastExperience"
import { useNavigate, useParams } from "react-router-dom"
import { DASHBOARD_PAGE, MOCK_INTERVIEW_PAGE, MOCK_INTERVIEW_VIEW_PAGE } from "../constant/routes"
import { gql, useQuery } from "@apollo/client"
import Loading from "../component/loading/Loading"
import { PlusCircleIcon } from "@heroicons/react/solid"
import GoBackButton from "../component/buttons/GoBackButton"
import { INTERVIEW_TIPS } from "../constant/tips"

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

        mockInterviews(companyDescriptionId: $companyDescriptionId, roleId: $roleId) {
            id
            question
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
    mockInterviews: {
        id: number
        question: string
    }[]
}

const InterviewPrep: React.FC = () => {
    const navigate = useNavigate()
    const { companyDescriptionId, roleId } = useParams()
    const { data, loading } = useQuery<GetCompanyDescription>(GET_COMPANY_DESCRIPTION, {
        variables: {
            companyDescriptionId,
            roleId,
        },
        fetchPolicy: "no-cache",
    })

    if (!companyDescriptionId || !roleId) {
        navigate(DASHBOARD_PAGE.path)
        return null
    }

    if (loading || !data || data.companyDescription.roles.length === 0) return <Loading />

    return (
        <div className={"flex flex-col"}>
            <div>
                <div>
                    <GoBackButton link={DASHBOARD_PAGE.path} title={"Go Back To Dashboard"} />
                </div>
                <div className={"my-8"}>
                    <h1 className={"text-xl leading-6 font-medium text-gray-900"}>Interview Preparation</h1>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {data.companyDescription.company.name} - {data.companyDescription.roles[0].name}
                    </p>
                </div>
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
                            title: "Mock Interview",
                            subtitle:
                                "Often, we do not know how we answer and act during the interview. This feature is for you to analyze yourself during the interview.",
                            detail: (
                                <div className={"flex flex-col gap-3"}>
                                    <div className={"flex justify-between items-center mb-2"}>
                                        <div>
                                            <h2 className={"leading-6 font-medium text-gray-900"}>Mock Interviews</h2>
                                        </div>
                                        <div className={"flex justify-center"}>
                                            <button
                                                className={
                                                    "bg-amber-200 rounded p-2 cursor-pointer flex gap-2 hover:bg-amber-300 justify-center items-center"
                                                }
                                                onClick={() =>
                                                    navigate(
                                                        MOCK_INTERVIEW_PAGE.path
                                                            .replace(":companyDescriptionId", companyDescriptionId)
                                                            .replace(":roleId", roleId)
                                                    )
                                                }
                                            >
                                                <PlusCircleIcon className={"h-5 w-5"} />
                                                <div className={"text-xs md:text-sm"}>Start Mock Interview!</div>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        {data.mockInterviews.length === 0 ? (
                                            <div className={"flex flex-col justify-center items-center text-center"}>
                                                <div className={"mt-2 block text-sm font-medium text-gray-900"}>
                                                    No Mock Interview has been Added
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-gray-200">
                                                {data.mockInterviews.map((mockInterview) => {
                                                    return (
                                                        <button
                                                            key={mockInterview.id}
                                                            className={"w-full hover:bg-gray-100 py-3"}
                                                            onClick={() =>
                                                                navigate(
                                                                    MOCK_INTERVIEW_VIEW_PAGE.path
                                                                        .replace(
                                                                            ":companyDescriptionId",
                                                                            companyDescriptionId
                                                                        )
                                                                        .replace(":roleId", roleId)
                                                                        .replace(
                                                                            ":mockInterviewId",
                                                                            mockInterview.id.toString()
                                                                        )
                                                                )
                                                            }
                                                        >
                                                            <div className="flex flex-col text-sm text-left">
                                                                <p className="font-medium text-indigo-600 truncate underline">
                                                                    {mockInterview.question}
                                                                </p>
                                                            </div>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ),
                        },
                        {
                            title: "Interview Tips",
                            detail: (
                                <div
                                    className={
                                        "flex justify-center items-center my-3 block text-sm font-medium text-gray-900"
                                    }
                                >
                                    <div className="divide-y divide-gray-200">
                                        {INTERVIEW_TIPS.map((interviewTip) => {
                                            return (
                                                <div className={"w-full hover:bg-gray-100 py-3"}>
                                                    <div className="flex flex-col text-sm">
                                                        <p className="font-medium text-indigo-600 truncate">
                                                            {interviewTip.title}
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                                            {interviewTip.subtitle}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default InterviewPrep
