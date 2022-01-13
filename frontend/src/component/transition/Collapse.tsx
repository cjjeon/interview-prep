import React, { useEffect, useRef, useState } from "react"

interface CollapseProp {
    isOpen: boolean
    className?: string
    minHeight?: number
}

const Collapse: React.FC<CollapseProp> = ({ isOpen, minHeight = 0, children, className }) => {
    const [childHeight, setChildHeight] = useState<number>(0)
    const childRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (childRef && childRef.current) {
            setChildHeight(childRef.current.scrollHeight + 100)
        }
    }, [childRef])

    return (
        <div
            className={className}
            style={{
                overflow: "hidden",
                transition: "0.5s max-height",
                maxHeight: isOpen ? childHeight : minHeight,
            }}
        >
            <div ref={childRef}>{children}</div>
        </div>
    )
}

export default Collapse
