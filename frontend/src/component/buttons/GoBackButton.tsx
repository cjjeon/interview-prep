import React from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface GoBackButtonProps {
    link: string
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ link }) => {
    const navigate = useNavigate()

    const goTo = () => {
        if (link) {
            navigate(link)
        } else {
            navigate(-1)
        }
    }

    return (
        <button onClick={() => goTo()} className={"text-sm text-blue-400 hover:text-blue-300"}>
            <div className={"flex items-center gap-2"}>
                <FaArrowLeft size={13} />
                Go Back
            </div>
        </button>
    )
}

export default GoBackButton
