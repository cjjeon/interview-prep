import React from "react"
import Collapsible from "../component/collapsibles/CollapsibleItem"
import PastExperience from "./components/PastExperience"

const Interview: React.FC = () => {
    return (
        <div className={"text-center flex w-full"}>
            <Collapsible
                items={[
                    { title: "Review Past Experience", detail: <PastExperience /> },
                    { title: "Mock Interview", detail: <div>Mock Interview Detail</div> },
                    { title: "Tips Before The Interview", detail: <div>Tip Before Interview Detail</div> },
                ]}
            />
        </div>
    )
}

export default Interview
