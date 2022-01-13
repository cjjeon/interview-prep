import React from "react"

interface InputTextProps {
    name: string
    label: string
    value: string
    type: "text" | "password"
    onChange: (value: string) => void
    placeholder?: string
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const InputText: React.FC<InputTextProps> = ({ name, label, value, type, placeholder, onKeyPress, onChange }) => {
    return (
        <div className={"relative"}>
            <label className={"block text-sm font-medium text-gray-700"} htmlFor={name}>
                {label}
            </label>
            <div className={"mt-1"}>
                <input
                    className={`shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2`}
                    type={type}
                    value={value}
                    id={name}
                    onKeyPress={onKeyPress}
                    placeholder={placeholder}
                    onChange={(event) => onChange(event.target.value)}
                />
            </div>
        </div>
    )
}

export default InputText
