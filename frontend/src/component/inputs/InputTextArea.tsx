import React from "react"
import "./InputText.css"

interface InputTextProps {
    name: string
    placeholder: string
    value: string
    onChange: (value: string) => void
}

const InputTextArea: React.FC<InputTextProps> = ({ name, placeholder, value, onChange }) => {
    return (
        <div className={"mb-4 relative"}>
            <textarea
                rows={5}
                className={`shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3`}
                value={value}
                id={name}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputTextArea
