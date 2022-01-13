import React from "react"

interface SimpleButtonProps {
    label: string
    onClick: () => void
    icon?: React.ReactElement
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ label, onClick, icon }) => {
    return (
        <button
            className={`bg-amber-200 rounded p-2 cursor-pointer flex gap-2 hover:bg-amber-300 justify-center items-center text-xs md:text-sm`}
            onClick={onClick}
        >
            <div className={"flex gap-3 justify-center items-center"}>
                {icon}
                {label}
            </div>
        </button>
    )
}

export default SimpleButton
