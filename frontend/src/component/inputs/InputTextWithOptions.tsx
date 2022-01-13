import React, { useEffect, useState } from "react"

interface InputTextWithOptionsProps {
    name: string
    label: string
    value: string
    type: "text" | "password"
    onChange: (value: string) => void
    options: string[]
    placeholder?: string
    background?: "white" | "transparent"
}

const InputTextWithOptions: React.FC<InputTextWithOptionsProps> = ({
    name,
    label,
    value,
    type,
    onChange,
    options,
    placeholder = "",
    background = "white",
}) => {
    const [focus, setFocus] = useState<number>(0)

    useEffect(() => {
        setFocus(0)
    }, [value])

    const displayOptions = (): boolean => {
        if (options.length > 0) {
            return !(options.length === 1 && options[0] === value)
        }
        return false
    }

    const setFocusChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            setFocus((prevState) => {
                if (options.length - 1 > prevState) return prevState + 1
                return prevState
            })
        } else if (event.key === "ArrowUp") {
            setFocus((prevState) => {
                if (prevState > 0) {
                    return prevState - 1
                }
                return prevState
            })
        } else if (event.key === "Enter") {
            if (focus >= 0) {
                onChange(options[focus])
            }
        }
    }

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
                    onKeyDown={setFocusChange}
                    onChange={(event) => onChange(event.target.value)}
                    autoComplete={"off"}
                    placeholder={placeholder}
                />
            </div>
            {displayOptions() ? (
                <div className="mt-2 border-2 rounded bg-white sm:text-sm divide-y divide-gray-200 fixed">
                    {options.map((option, index) => {
                        return (
                            <div
                                key={index}
                                className={`p-2 ${index === focus ? "bg-blue-100" : ""}`}
                                onClick={() => onChange(option)}
                            >
                                {option}
                            </div>
                        )
                    })}
                </div>
            ) : null}
        </div>
    )
}

export default InputTextWithOptions
