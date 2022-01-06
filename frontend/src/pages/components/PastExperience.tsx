import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import SimpleButton from "../../component/buttons/SimpleButton"
import Modal from "../../component/modals/Modal"
import AddExperience from "./AddExperience"

interface Experience {
    id: number
    summary: string
}

interface ExperienceData {
    experiences: Experience[]
}

const GET_EXPERIENCES = gql`
    query getExperiences($companyDescriptionId: ID, $roleId: ID) {
        experiences(companyDescriptionId: $companyDescriptionId, roleId: $roleId) {
            experiences {
                id
                summary
            }
        }
    }
`

const PastExperience: React.FC = () => {
    const [addExperienceModalOpen, setAddExperienceModalOpen] = useState<boolean>(false)

    const { companyDescriptionId, roleId } = useParams()
    const { data, refetch } = useQuery<ExperienceData>(GET_EXPERIENCES, {
        variables: {
            companyDescriptionId: companyDescriptionId ? companyDescriptionId : null,
            roleId: roleId ? roleId : null,
        },
    })

    return (
        <div className={"p-5 flex flex-col gap-2"}>
            <Modal
                isOpen={addExperienceModalOpen}
                onClose={() => setAddExperienceModalOpen(false)}
                title={"Add New Experience"}
            >
                <AddExperience
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
            <div>
                Before doing interview, it's important to go over your past experience that's related to the skill
                required for the job. Typically, the interviewer will ask question related to job requirements.
            </div>
            <div className={"w-full"}>
                {data?.experiences && data.experiences.length > 0 ? (
                    <div>Data Found</div>
                ) : (
                    <div className={"flex flex-col gap-2 rounded-lg border-4 border-dotted p-5"}>
                        <div>No Past Experience has been Added</div>
                        <div>
                            <SimpleButton
                                color={"yellow"}
                                label={"Add New Experience"}
                                onClick={() => setAddExperienceModalOpen(true)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PastExperience
