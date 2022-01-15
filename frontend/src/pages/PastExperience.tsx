import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import Modal from "../component/modals/Modal"
import CreateExperienceModal from "./CreateExperienceModal"
import ViewExperience from "./ViewExperience"
import { PlusCircleIcon } from "@heroicons/react/solid"

interface Experience {
    id: number
    summary: string
    skills: { name: string }[]
}

interface ExperienceData {
    experiences: Experience[]
}

const GET_EXPERIENCES = gql`
    query getExperiences($companyDescriptionId: ID, $roleId: ID) {
        experiences(companyDescriptionId: $companyDescriptionId, roleId: $roleId) {
            id
            summary
            skills {
                name
            }
        }
    }
`

const PastExperience: React.FC = () => {
    const [addExperienceModalOpen, setAddExperienceModalOpen] = useState<boolean>(false)
    const [viewExperienceModalOpen, setViewExperienceModalOpen] = useState<boolean>(false)
    const [viewExperienceId, setViewExperienceId] = useState<number>(0)

    const { companyDescriptionId, roleId } = useParams()
    const { data, refetch } = useQuery<ExperienceData>(GET_EXPERIENCES, {
        variables: {
            companyDescriptionId: companyDescriptionId ? companyDescriptionId : null,
            roleId: roleId ? roleId : null,
        },
    })

    return (
        <div className={"flex flex-col gap-2"}>
            <Modal
                isOpen={addExperienceModalOpen}
                onClose={() => setAddExperienceModalOpen(false)}
                title={"Create New Experience"}
            >
                <CreateExperienceModal
                    companyDescriptionId={companyDescriptionId ? parseInt(companyDescriptionId) : null}
                    roleId={roleId ? parseInt(roleId) : null}
                    onAfterSubmit={() => {
                        refetch({
                            companyDescriptionId: companyDescriptionId ? companyDescriptionId : null,
                            roleId: roleId ? roleId : null,
                        }).then(() => {
                            setAddExperienceModalOpen(false)
                        })
                    }}
                />
            </Modal>

            <Modal
                isOpen={viewExperienceModalOpen}
                onClose={() => setViewExperienceModalOpen(false)}
                title={"View Experience"}
            >
                <ViewExperience experienceId={viewExperienceId} />
            </Modal>
            <div className={"flex justify-between items-center mb-2"}>
                <div>
                    <h2 className={"leading-6 font-medium text-gray-900"}>Past Experiences</h2>
                </div>
                <div className={"flex justify-center"}>
                    <button
                        className={
                            "bg-amber-200 rounded p-2 cursor-pointer flex gap-2 hover:bg-amber-300 justify-center items-center"
                        }
                        onClick={() => setAddExperienceModalOpen(true)}
                    >
                        <PlusCircleIcon className={"h-5 w-5"} />
                        <div className={"text-xs md:text-sm"}>New Experience</div>
                    </button>
                </div>
            </div>
            <div className={"w-full"}>
                {data?.experiences && data.experiences.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {data.experiences.map((experience) => {
                            return (
                                <button
                                    key={experience.id}
                                    className={"w-full hover:bg-gray-100 py-3"}
                                    onClick={() => {
                                        setViewExperienceId(experience.id)
                                        setViewExperienceModalOpen(true)
                                    }}
                                >
                                    <div className="flex flex-col text-sm text-left">
                                        <p className="font-medium text-indigo-600 underline">{experience.summary}</p>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {experience.skills.map((skill, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={"text-xs bg-indigo-200 rounded-full px-2"}
                                                    >
                                                        {skill.name}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                ) : (
                    <div className={"flex flex-col justify-center items-center text-center"}>
                        <div className={"mt-2 block text-sm font-medium text-gray-900"}>
                            No Past Experience has been Added
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PastExperience
