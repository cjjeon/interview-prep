import React from "react"
import SimpleButton from "../component/buttons/SimpleButton"
import Collapsible from "../component/collapsibles/CollapsibleItem"
import PastExperience from "./PastExperience"
import { useNavigate, useParams } from "react-router-dom"
import { DASHBOARD_PAGE, MOCK_INTERVIEW_PAGE } from "../constant/routes"

const Interview: React.FC = () => {
    const navigate = useNavigate()

    const { companyDescriptionId, roleId } = useParams()

    if (!companyDescriptionId || !roleId) {
        navigate(DASHBOARD_PAGE.path)
        return null
    }

    return (
        <div className={"bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl"}>
            <Collapsible
                items={[
                    { title: "Review Past Experience", detail: <PastExperience /> },
                    {
                        title: "Mock Interview",
                        detail: (
                            <div className={"flex flex-col gap-3 p-3"}>
                                <div>
                                    Often, we do not know how we answer and act during the interview. This feature is
                                    for you to analyze yourself during the interview.
                                </div>
                                <div>
                                    <SimpleButton
                                        label={"Start Mock Interview!"}
                                        onClick={() =>
                                            navigate(
                                                MOCK_INTERVIEW_PAGE.path
                                                    .replace(":companyDescriptionId", companyDescriptionId)
                                                    .replace(":roleId", roleId)
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ),
                    },
                    { title: "Tips Before The Interview", detail: <div>Tip Before Interview Detail</div> },
                ]}
            />
        </div>
    )
}

export default Interview
