import React, { useState } from "react"
import Collapse from "../transition/Collapse"
import { FaChevronRight } from "react-icons/fa"

interface CollapsibleItemProps {
    title: string
    detail: React.ReactElement
}

const CollapsibleItem: React.FC<CollapsibleItemProps> = ({ title, detail }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className={"w-full p-3"}>
            <div className={"flex align-center justify-between"} onClick={() => setIsOpen((prev) => !prev)}>
                <div>{title}</div>
                <div className={"pl-10"}>
                    <FaChevronRight
                        className={`transform transition ease-in-out delay-150 ${isOpen ? "rotate-90" : ""}`}
                    />
                </div>
            </div>
            <Collapse isOpen={isOpen}>{detail}</Collapse>
        </div>
    )
}

interface CollapsibleProps {
    items: CollapsibleItemProps[]
}

const Collapsible: React.FC<CollapsibleProps> = ({ items }) => {
    return (
        <div>
            {items.map((collapsible, index) => {
                return <CollapsibleItem key={index} title={collapsible.title} detail={collapsible.detail} />
            })}
        </div>
    )
}

export default Collapsible
