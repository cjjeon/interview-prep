import React from "react"
import { gql, useQuery } from "@apollo/client"
import Loading from "../component/loading/Loading"

const GET_EXPERIENCE = gql`
    query GetExperience($id: ID!) {
        experience(id: $id) {
            summary
            situation
            action
            outcome
            skills {
                name
            }
        }
    }
`

interface GetExperienceData {
    experience: {
        summary: string
        situation: string
        action: string
        outcome: string
        skills: {
            name: string
        }[]
    }
}

interface ViewExperienceProps {
    experienceId: number
}

const ViewExperience: React.FC<ViewExperienceProps> = ({ experienceId }) => {
    const { data, loading } = useQuery<GetExperienceData>(GET_EXPERIENCE, { variables: { id: experienceId } })

    if (loading) return <Loading />
    return (
        <div className={"flex flex-col gap-4 p-5"}>
            <div>
                <div className={"block text-sm font-medium text-gray-700"}>What's the experience / project about?</div>
                <div className={"p-2 text-sm text-gray-500 line-clamp-2"}>{data?.experience.summary}</div>
            </div>
            <div>
                <div className={"block text-sm font-medium text-gray-700"}>
                    Can you describe the situation in details? What is it about?
                </div>
                <div className={"p-2 text-sm text-gray-500 line-clamp-2"}>{data?.experience.situation}</div>
            </div>
            <div>
                <div className={"block text-sm font-medium text-gray-700"}>What did you do?</div>
                <div className={"p-2 text-sm text-gray-500 line-clamp-2"}>{data?.experience.action}</div>
            </div>
            <div>
                <div className={"block text-sm font-medium text-gray-700"}>What was the outcome?</div>
                <div className={"p-2 text-sm text-gray-500 line-clamp-2"}>{data?.experience.outcome}</div>
            </div>
            <div>
                <h1 className={"block text-sm font-medium text-gray-700"}>
                    What Skills And Responsibilities required for the experience / project?
                </h1>
                <div className={"flex justify-center gap-2 mt-2"}>
                    {data?.experience.skills.map((skill) => {
                        return <div className={"text-xs bg-indigo-200 rounded-full px-2"}>{skill.name}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ViewExperience
