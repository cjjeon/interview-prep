import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import FadeInOut from "../component/transition/FadeInOut"
import SimpleButton from "../component/buttons/SimpleButton"
import { FaWindowClose } from "react-icons/fa"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useNavigate, useParams } from "react-router-dom"
import InputTextWithOptions from "../component/inputs/InputTextWithOptions"
import { INTERVIEW_PAGE } from "../constant/routes"

const GET_ROLES_SKILLS = gql`
    query searchRoles($roleFilterName: String, $skillFilterName: String) {
        searchRoles(filterName: $roleFilterName) {
            roles {
                name
            }
        }
        skills(filterName: $skillFilterName) {
            skills {
                name
            }
        }
    }
`

const CREATE_ROLE = gql`
    mutation CreateRole($companyDescriptionId: ID!, $role: String!, $skills: [String]!) {
        createRole(companyDescriptionId: $companyDescriptionId, role: $role, skills: $skills) {
            roleSkill {
                id
            }
        }
    }
`

const CreateRole: React.FC = () => {
    const [role, setRole] = useState<string>("")
    const [skills, setSkills] = useState<string[]>([])
    const [skill, setSkill] = useState<string>("")

    const { data, loading, refetch } = useQuery(GET_ROLES_SKILLS, {
        variables: { roleFilterName: "", skillFilterName: "" },
    })
    const [createRole] = useMutation(CREATE_ROLE)

    const navigate = useNavigate()
    const { companyDescriptionId } = useParams()

    useEffect(() => {
        refetch({
            roleFilterName: role,
            skillFilterName: skill,
        }).then()
    }, [role, skill, refetch])

    const addSkill = () => {
        if (skill && !skills.includes(skill)) {
            setSkills((prevState) => [...prevState, skill])
            setSkill("")
        }
    }

    const removeSkill = (index: number) => {
        setSkills((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)])
    }

    const create = () => {
        if (!companyDescriptionId) return null
        if (role === "") {
            toast.error("Please enter the role!")
        } else if (skills.length === 0) {
            toast.error("Please add the skill")
        } else {
            createRole({
                variables: {
                    companyDescriptionId,
                    role,
                    skills,
                },
            }).then(({ data, errors }) => {
                if (errors) {
                    toast.error(errors)
                } else {
                    if (data && data.createRole) {
                        navigate(
                            INTERVIEW_PAGE.path
                                .replace(":companyDescriptionId", companyDescriptionId)
                                .replace(":roleId", data.createRole.roleSkill.id)
                        )
                    }
                }
            })
        }
    }

    return (
        <div className={"bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl"}>
            <div className={"px-4 py-5 sm:px-6"}>
                <h1 className={"text-lg leading-6 font-medium text-gray-900"}>Know The Job Position</h1>
                <p className="mt-1 text-sm text-gray-500">
                    When you are doing interview, it's important to understand what company is looking for. Often, you
                    can find what the company is looking for in the job description.
                </p>
            </div>
            <div className={"flex flex-col gap-5 px-4 sm:px-6 mb-3"}>
                <FadeInOut
                    components={[
                        <div>
                            <InputTextWithOptions
                                name={"position"}
                                label={"What position you are applying for?"}
                                value={role}
                                type={"text"}
                                onChange={setRole}
                                options={
                                    loading
                                        ? []
                                        : data && data?.searchRoles && data?.searchRoles?.roles
                                        ? data.searchRoles.roles.map((role: any) => role.name)
                                        : []
                                }
                                placeholder={"Example: Full Stack Engineer"}
                                background={"transparent"}
                            />
                        </div>,
                        <div>
                            <div className={"flex flex-col gap-2 block text-sm font-medium text-gray-700 mb-3"}>
                                <div>
                                    There are high chances during the interview that they will ask questions related to
                                    job's requirements, skills, and responsibilities. And, you should be prepared to
                                    show that you have the experience and skills to do the job. And, these points are
                                    often listed in the job description post.
                                </div>
                            </div>
                            <div
                                className={
                                    "my-5 border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                }
                            >
                                {skills.length === 0 ? (
                                    <div className={"flex flex-col justify-center items-center text-center"}>
                                        <div className={"mt-2 block text-sm font-medium text-gray-900"}>
                                            No Skills or Responsibilities have been added
                                        </div>
                                    </div>
                                ) : (
                                    <div className={"flex justify-center flex-wrap gap-2 text-xs "}>
                                        {skills.map((s, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={
                                                        "flex items-center gap-2 bg-indigo-200 rounded-full px-2"
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
                            <div className={"flex gap-3 items-center"}>
                                <div className={"flex-grow"}>
                                    <InputTextWithOptions
                                        name={"jobSkills"}
                                        label={"What's the skills / responsibility required for the position?"}
                                        value={skill}
                                        type={"text"}
                                        onChange={setSkill}
                                        options={
                                            loading
                                                ? []
                                                : data && data?.skills && data?.skills?.skills
                                                ? data.skills.skills.map((skill: any) => skill.name)
                                                : []
                                        }
                                        placeholder={"Example: Python, React, Microservices, Leadership, Management"}
                                        background={"transparent"}
                                    />
                                </div>
                                <div>
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
