import React, { useState } from "react"
import { toast } from "react-toastify"
import InputText from "../../component/inputs/InputText"
import FadeInOut from "../../component/transition/FadeInOut"
import SimpleButton from "../../component/buttons/SimpleButton"
import { FaWindowClose } from "react-icons/fa"
import { gql, useMutation } from "@apollo/client"
import { useParams } from "react-router-dom"

const CREATE_ROLE = gql`
    mutation CreateRole($companyId: ID!, $role: String!, $skills: [String]!) {
        createRole(companyId: $companyId, role: $role, skills: $skills) {
            success
            errors
            role {
                id
            }
        }
    }
`

const CreateRole: React.FC = () => {
    const [role, setRole] = useState<string>("")
    const [skills, setSkills] = useState<string[]>([])
    const [skill, setSkill] = useState<string>("")

    const { companyId } = useParams()

    const [createRole] = useMutation(CREATE_ROLE)

    const addSkill = () => {
        if (skill) {
            setSkills((prevState) => [...prevState, skill])
            setSkill("")
        }
    }

    const removeSkill = (index: number) => {
        setSkills((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)])
    }

    const create = () => {
        if (role === "") {
            toast.error("Please enter the role!")
        } else if (skills.length === 0) {
            toast.error("Please add the skill")
        } else {
            createRole({
                variables: {
                    companyId,
                    role,
                    skills,
                },
            }).then(({ data, errors }) => {
                if (errors) {
                    toast.error(errors)
                } else {
                    if (data && data.createRole.success) {
                        toast.success("Success Creation")
                        console.log(data)
                    }
                }
            })
        }
    }

    return (
        <div className={"flex flex-col justify-center h-screen w-full p-20 gap-10"}>
            <div>
                <h1 className={"text-3xl mb-5"}>Know The Job Position</h1>
                <div>
                    When you are doing interview, it's important to understand what company is looking for. Often, you
                    can find what the company is looking for in the job description.
                </div>
            </div>
            <div className={"flex flex-col gap-5"}>
                <FadeInOut
                    components={[
                        <div>
                            <h3>What position you are applying for?</h3>
                            <InputText
                                name={"position"}
                                label={"Enter the name of role"}
                                value={role}
                                type={"text"}
                                onChange={setRole}
                            />
                        </div>,
                        <div className={"flex flex-col gap-4"}>
                            <div>
                                There are high chances during the interview that they will ask questions related to
                                job's requirements, skills, and responsibilities. And, you should be prepared to show
                                that you have the experience and skills to do the job. And, these points are often
                                listed in the job description post.
                            </div>
                            <div>
                                Can you try list out all the requirements, skills, and responsibilities of the job? This
                                will help the tool to find out what questions might help you on the interview.
                            </div>
                            <div>
                                For Example, as software developer, add skills for Python, Golang, Architecture,
                                Microservices, Scalability, etc. Or, for the soft skills, add something like Leadership,
                                Management, etc.
                            </div>
                            <div className={"my-5 p-8 border-4 rounded-lg border-dotted"}>
                                {skills.length === 0 ? (
                                    <div className={"flex flex-col justify-center items-center text-center"}>
                                        <div className={"text-lg font-bold italic"}>
                                            No Job Requirements, Skills or Responsibilities have been added
                                        </div>
                                    </div>
                                ) : (
                                    <div className={"flex justify-center flex-wrap gap-2 relative"}>
                                        <div className={"absolute -top-6 -left-6 text-xs"}>
                                            List of requirements, skills or responsibilities:
                                        </div>
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
                            <div className={"flex gap-3"}>
                                <div className={"flex-grow"}>
                                    <InputText
                                        name={"jobSkills"}
                                        label={"Enter Job Requirement or Responsibility"}
                                        value={skill}
                                        type={"text"}
                                        onChange={setSkill}
                                        onKeyPress={(event) => {
                                            if (event.key === "Enter") {
                                                addSkill()
                                            }
                                        }}
                                    />
                                </div>
                                <div className={"flex-nonw w-24"}>
                                    <SimpleButton label={"Add Skill"} onClick={addSkill} />
                                </div>
                            </div>
                        </div>,
                    ]}
                    completeOnClick={create}
                />
            </div>
        </div>
    )
}

export default CreateRole
