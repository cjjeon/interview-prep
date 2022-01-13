import React from "react"

interface InputTextProps {
    name: string
    placeholder: string
    value: string
    onChange: (value: string) => void
    label?: string
}

const InputTextArea: React.FC<InputTextProps> = ({ name, placeholder, value, onChange, label }) => {
    return (
        <div className={"mb-4 relative"}>
            {label ? <label className={"block text-sm font-medium text-gray-700"}>{label}</label> : null}
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
