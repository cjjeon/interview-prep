import React, { useEffect, useState } from "react"
import { gql, useMutation, useQuery } from "@apollo/client"
import InputTextWithOptions from "../../component/inputs/InputTextWithOptions"
import InputText from "../../component/inputs/InputText"
import { FaWindowClose } from "react-icons/fa"
import { toast } from "react-toastify"

const GET_ADD_EXPERIENCE = gql`
    query AddExperience($skillFilterName: String, $companyDescriptionId: ID, $roleId: ID) {
        searchSkills: skills(filterName: $skillFilterName) {
            skills {
                name
            }
        }

        roleSkills: skills(companyDescriptionId: $companyDescriptionId, roleId: $roleId, limit: 20) {
            skills {
                name
            }
        }
    }
`

interface skill {
    name: string
}

interface QueryAddExperienceData {
    searchSkills: {
        skills: skill[]
    }
    roleSkills: {
        skills: skill[]
    }
}

const CREATE_EXPERIENCE = gql`
    mutation CreateExperience(
        $summary: String!
        $situation: String!
        $action: String!
        $outcome: String!
        $skills: [String]!
    ) {
        createExperience(
            summary: $summary
            situation: $situation
            action: $action
            outcome: $outcome
            skills: $skills
        ) {
            experience {
                id
            }
        }
    }
`

interface AddExperienceProps {
    companyDescriptionId: number | null
    roleId: number | null
    onAfterSubmit?: () => void
}

const AddExperience: React.FC<AddExperienceProps> = ({ companyDescriptionId, roleId, onAfterSubmit }) => {
    const [skill, setSkill] = useState<string>("")
    const [skills, setSkills] = useState<string[]>([])
    const [recommendSkills, setRecommendSkills] = useState<string[]>([])

    const [summary, setSummary] = useState<string>("")
    const [situation, setSituation] = useState<string>("")
    const [action, setAction] = useState<string>("")
    const [outcome, setOutcome] = useState<string>("")

    const { data, refetch } = useQuery<QueryAddExperienceData>(GET_ADD_EXPERIENCE, {
        variables: {
            skillFilterName: "",
            companyDescriptionId,
            roleId,
        },
    })

    const [createExperience] = useMutation(CREATE_EXPERIENCE)

    useEffect(() => {
        if (data?.roleSkills) {
            const tempSkills: string[] = []
            data.roleSkills.skills.forEach((skill) => {
                if (!skills.includes(skill.name)) {
                    tempSkills.push(skill.name)
                }
            })
            setRecommendSkills(tempSkills)
        }
    }, [data, skills])

    useEffect(() => {
        refetch({
            skillFilterName: skill,
        }).then()
    }, [skill, refetch])

    const addSkill = (value: string) => {
        if (value && !skills.includes(value)) {
            setSkills((prevState) => [...prevState, value])
            setSkill("")
        }
    }

    const removeSkill = (index: number) => {
        setSkills((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)])
    }

    const submit = () => {
        if (summary === "") {
            toast.error("Please add summary of the experience or project")
        }

        if (skills.length === 0) {
            toast.error("Please add skill or responsibilities used")
            return
        }

        if (situation === "") {
            toast.error("Please add the situation of the experience or project")
        }

        if (action === "") {
            toast.error("Please add what action you took for the experience or project")
        }

        if (outcome === "") {
            toast.error("Please add what was the outcome of the experience or project")
        }

        createExperience({
            variables: {
                summary,
                situation,
                action,
                outcome,
                skills,
            },
        }).then(({ errors }) => {
            if (errors) {
                toast.error("Fail to create experience")
            } else {
                if (onAfterSubmit) onAfterSubmit()
            }
        })
    }

    return (
        <div className={"flex flex-col gap-2 p-5"}>
            <div>
                <div>What's the experience / project about?</div>
                <InputText
                    name={"summary"}
                    label={"Write summary of the experience / project"}
                    value={summary}
                    type={"text"}
                    onChange={(value) => setSummary(value)}
                />
            </div>
            <div>
                <div>Can you describe the situation in details? What is it about?</div>
                <InputText
                    name={"situation"}
                    label={"Explain the situation"}
                    value={situation}
                    type={"text"}
                    onChange={(value) => setSituation(value)}
                />
            </div>
            <div>
                <div>What did you do?</div>
                <InputText
                    name={"action"}
                    label={"Write the action(s) that you took"}
                    value={action}
                    type={"text"}
                    onChange={(value) => setAction(value)}
                />
            </div>
            <div>
                <div>What was the outcome?</div>
                <InputText
                    name={"outcome"}
                    label={"Write the result"}
                    value={outcome}
                    type={"text"}
                    onChange={(value) => setOutcome(value)}
                />
            </div>
            <div className={"flex flex-col gap-3"}>
                <h1>What Skills And Responsibilities required for the experience / project?</h1>
                <div>
                    <div className={"border-dotted rounded-lg border-4 border-gray-400 p-3"}>
                        {skills.length === 0 ? (
                            <div className={"text-center font-bold italic text-sm my-2"}>
                                No Skills and Responsibilities Added
                            </div>
                        ) : (
                            <div className={"flex justify-center flex-wrap gap-2 relative"}>
                                {skills.map((s, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={
                                                "flex items-center gap-2 border-2 rounded-full bg-blue-100 px-3 text-sm"
                                            }
                                        >
                                            <div>{s}</div>
                                            <div
                                                className={"rounded-lg text-red-500 hover:text-red-300"}
                                                onClick={() => removeSkill(index)}
                                            >
                                                <FaWindowClose />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <div className={"my-4"}>
                        {recommendSkills.length > 0 ? (
                            <div>
                                <div className={"text-sm font-light text-center my-2"}>
                                    Recommended Skills and Responsibilities For The Company
                                </div>
                                <div className={"flex justify-center items-center gap-2"}>
                                    {recommendSkills.map((skill, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className={"text-sm bg-green-200 rounded-full px-2"}
                                                onClick={() => addSkill(skill)}
                                            >
                                                {skill}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className={"flex justify-center items-center gap-3"}>
                        <div className={"h-12"}>
                            <InputTextWithOptions
                                name={"skills"}
                                label={"Skills"}
                                value={skill}
                                type={"text"}
                                onChange={setSkill}
                                options={data?.searchSkills ? data?.searchSkills.skills.map((skill) => skill.name) : []}
                            />
                        </div>
                        <button className={"rounded bg-yellow-200 px-5 h-12"} onClick={() => addSkill(skill)}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
            <div className={"flex justify-end"}>
                <button className={"rounded bg-yellow-200 px-5 h-12"} onClick={submit}>
                    Create
                </button>
            </div>
        </div>
    )
}

export default AddExperience
