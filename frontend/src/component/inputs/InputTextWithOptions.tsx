import React, { useEffect, useState } from "react"
import "./InputText.css"

interface InputTextWithOptionsProps {
    name: string
    label: string
    value: string
    type: "text" | "password"
    onChange: (value: string) => void
    options: string[]
    background?: "white" | "transparent"
}

const InputTextWithOptions: React.FC<InputTextWithOptionsProps> = ({
    name,
    label,
    value,
    type,
    onChange,
    options,
    background = "white",
}) => {
    const [focus, setFocus] = useState<number>(0)

    useEffect(() => {
        setFocus(0)
    }, [value])

    let backgroundCSS = "bg-white"
    if (background === "transparent") backgroundCSS = "bg-transparent"

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
        <div className={"mb-4 relative"}>
            <input
                className={`__input_text_input ${
                    value !== "" ? "filled" : ""
                } border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600 ${backgroundCSS}`}
                type={type}
                value={value}
                id={name}
                onKeyDown={setFocusChange}
                onChange={(event) => onChange(event.target.value)}
                autoComplete={"off"}
            />
            <label
                className={
                    "__input_text_label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
                }
                htmlFor={name}
            >
                {label}
            </label>
            {displayOptions() ? (
                <div className="absolute mt-3 w-full rounded bg-white">
                    {options.map((option, index) => {
                        return (
                            <div
                                key={index}
                                className={`border border-gray-400 p-2 ${index === focus ? "bg-blue-100" : ""}`}
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
