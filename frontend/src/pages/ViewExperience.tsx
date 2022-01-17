import React from "react"
import ViewExperienceModal from "./ViewExperienceModal"
import { useNavigate, useParams } from "react-router-dom"
import { DASHBOARD_PAGE } from "../constant/routes"
import GoBackButton from "../component/buttons/GoBackButton"

const ViewExperience: React.FC = () => {
    const { experienceId } = useParams()
    const navigate = useNavigate()

    if (!experienceId) {
        navigate(DASHBOARD_PAGE.path)
        return null
    }

    return (
        <div>
            <div>
                <GoBackButton link={DASHBOARD_PAGE.path} title={"Go Back To Dashboard"} />
                <div className={"my-5"}>
                    <h2 className={"text-lg leading-6 font-medium text-gray-900"}>View Experience</h2>
                </div>
            </div>
            <div className={"bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl p-5"}>
                <ViewExperienceModal experienceId={parseInt(experienceId)} />
            </div>
        </div>
    )
}

export default ViewExperience
