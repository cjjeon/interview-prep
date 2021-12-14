import React from "react"
import "./InputText.css"

interface InputTextProps {
    name: string
    label: string
    value: string
    type: "text" | "password"
    onChange: (value: string) => void
    background?: "white" | "transparent"
}

const InputText: React.FC<InputTextProps> = ({
    name,
    label,
    value,
    type,
    onChange,
    background = "white",
}) => {
    let backgroundCSS = "bg-white"
    if (background === "transparent") backgroundCSS = "bg-transparent"

    return (
        <div className={"mb-4 relative"}>
            <input
                className={`__input_text_input ${
                    value !== "" ? "filled" : ""
                } border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600 ${backgroundCSS}`}
                type={type}
                value={value}
                id={name}
                onChange={(event) => onChange(event.target.value)}
            />
            <label
                className={
                    "__input_text_label absolute mb-0 -mt-3 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
                }
                htmlFor={name}
            >
                {label}
            </label>
        </div>
    )
}

export default InputText
