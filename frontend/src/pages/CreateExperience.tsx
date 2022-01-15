import React from "react"
import CreateExperienceModal from "./CreateExperienceModal"
import { useNavigate } from "react-router-dom"
import { DASHBOARD_PAGE } from "../constant/routes"
import GoBackButton from "../component/buttons/GoBackButton"

const CreateExperience: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className={"my-2"}>
                <GoBackButton link={DASHBOARD_PAGE.path} />
            </div>
            <div className={"bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl p-5"}>
                <div>
                    <h2 className={"text-lg leading-6 font-medium text-gray-900"}>Create New Experience</h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        The STAR (<strong>Situation</strong>, <strong>Task</strong>, <strong>Action</strong> and{" "}
                        <strong>Result</strong>) method helps you create an easy-to-follow story with a clear conflict
                        and resolution. By using this strategy, you can make sure you're fully addressing the
                        interviewer's question while also demonstrating how you were able to overcome previous
                        challenges and be successful.
                    </p>
                </div>
                <CreateExperienceModal
                    companyDescriptionId={null}
                    roleId={null}
                    onAfterSubmit={() => navigate(DASHBOARD_PAGE.path, { state: { reload: true } })}
                />
            </div>
        </div>
    )
}

export default CreateExperience
