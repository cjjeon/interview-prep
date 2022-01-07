import React from "react"
import { gql, useQuery } from "@apollo/client"
import Loading from "../../component/loading/Loading"

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

const ViewEditExperience: React.FC<ViewExperienceProps> = ({ experienceId }) => {
    const { data, loading } = useQuery<GetExperienceData>(GET_EXPERIENCE, { variables: { id: experienceId } })

    if (loading) return <Loading />
    return (
        <div className={"flex flex-col gap-2 p-5"}>
            <div>
                <div>What's the experience / project about?</div>
                <div className={"p-2 border"}>{data?.experience.summary}</div>
            </div>
            <div>
                <div>Can you describe the situation in details? What is it about?</div>
                <div className={"p-2 border"}>{data?.experience.situation}</div>
            </div>
            <div>
                <div>What did you do?</div>
                <div className={"p-2 border"}>{data?.experience.action}</div>
            </div>
            <div>
                <div>What was the outcome?</div>
                <div className={"p-2 border"}>{data?.experience.outcome}</div>
            </div>
            <div>
                <h1>What Skills And Responsibilities required for the experience / project?</h1>
                <div className={"flex justify-center gap-2"}>
                    {data?.experience.skills.map((skill) => {
                        return <div className={"px-2 text-xs font-medium bg-green-200 rounded-full"}>{skill.name}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ViewEditExperience
