import React, { useEffect, useState } from "react"
import { gql, useMutation, useQuery } from "@apollo/client"
import InputTextWithOptions from "../component/inputs/InputTextWithOptions"
import InputText from "../component/inputs/InputText"
import { FaWindowClose } from "react-icons/fa"
import { toast } from "react-toastify"
import InputTextArea from "../component/inputs/InputTextArea"
import SimpleButton from "../component/buttons/SimpleButton"

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

interface CreateExperienceProps {
    companyDescriptionId: number | null
    roleId: number | null
    onAfterSubmit?: () => void
}

const CreateExperience: React.FC<CreateExperienceProps> = ({ companyDescriptionId, roleId, onAfterSubmit }) => {
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
                <InputText
                    name={"summary"}
                    label={"What's the experience / project about? (Situation)"}
                    value={summary}
                    type={"text"}
                    onChange={(value) => setSummary(value)}
                />
            </div>
            <div>
                <InputTextArea
                    name={"situation"}
                    placeholder={
                        "Example: The project had a critical launch dates that had been set with a lot of sales and marketing investment riding on the product being ready. However the project was behind schedule, when our team leader unfortunately became ill, and had to leave."
                    }
                    value={situation}
                    onChange={(value) => setSituation(value)}
                    label={"Can you describe the situation in details? What is it about? (Task)"}
                />
            </div>
            <div>
                <InputTextArea
                    name={"action"}
                    placeholder={
                        "Example: I had been sports team captain at school, where I loved the challenge and responsibility of leadership. So I volunteered to stand in, and by using my technical analysis skills, spotted a few small mistakes made in the initial coding, that were causing the sporadic errors, and slowing us down. I then negotiated with our product director a small bonus incentive for the team, and budget for two pizza evenings, so we could pull a couple of late night shifts to correct the coding and catch up with the critical project landmarks."
                    }
                    value={action}
                    label={"What did you do? (Action)"}
                    onChange={(value) => setAction(value)}
                />
            </div>
            <div>
                <InputTextArea
                    name={"outcome"}
                    placeholder={
                        "Example: Though this took us 1.5% over budget the software was delivered on time with a better than target fault tolerance. The project was seen as a great success as the additional project cost was minimal compared to the costs of delaying the launch, and the negative affect on our product branding. The team where delighted with the extra bonus and I have now been officially promoted to team leader as a result"
                    }
                    value={outcome}
                    label={"What was the outcome? (Result)"}
                    onChange={(value) => setOutcome(value)}
                />
            </div>
            <div className={"flex flex-col gap-3"}>
                <p className={"block text-sm font-medium text-gray-700"}>
                    What Skills And Responsibilities required for the experience / project?
                </p>
                <div>
                    <div
                        className={
                            "border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        }
                    >
                        {skills.length === 0 ? (
                            <div className={"text-center font-bold italic text-sm my-2"}>
                                No Skills or Responsibilities have been added
                            </div>
                        ) : (
                            <div className={"flex justify-center flex-wrap gap-2 relative"}>
                                {skills.map((s, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={
                                                "flex items-center gap-2 border-2 text-xs bg-indigo-200 rounded-full px-2"
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
                                <div className={"block text-sm font-medium text-gray-700 text-center my-2"}>
                                    Recommended Skills and Responsibilities For The Company
                                </div>
                                <div className={"flex flex-wrap justify-center items-center gap-2"}>
                                    {recommendSkills.map((skill, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className={"text-xs bg-indigo-200 rounded-full px-2"}
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
                        <div className={"flex-grow"}>
                            <InputTextWithOptions
                                name={"skills"}
                                label={""}
                                placeholder={"Example: Python, Leadership"}
                                value={skill}
                                type={"text"}
                                onChange={setSkill}
                                options={data?.searchSkills ? data?.searchSkills.skills.map((skill) => skill.name) : []}
                            />
                        </div>
                        <div>
                            <SimpleButton label={"Add"} onClick={() => addSkill(skill)} />
                        </div>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <SimpleButton label={"Create"} onClick={submit} />
                </div>
            </div>
        </div>
    )
}

export default CreateExperience
