import React, { useState } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import SimpleButton from "../buttons/SimpleButton"
import "./FadeInOut.css"

interface FadeInOutProps {
    components: React.ReactElement[]
    completeOnClick: () => void
}

const FadeInOut: React.FC<FadeInOutProps> = ({ components, completeOnClick }) => {
    const [page, setPages] = useState<number>(0)

    const nodeRef = React.useRef<HTMLDivElement>(null)

    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition
                nodeRef={nodeRef}
                key={page}
                addEndListener={(done) => {
                    nodeRef.current?.addEventListener("transitionend", done, false)
                }}
                classNames={"__fade"}
            >
                <div ref={nodeRef}>
                    <div>{components[page]}</div>
                    <div className={"flex justify-end items-end gap-2 mt-2"}>
                        {page !== 0 ? (
                            <SimpleButton onClick={() => setPages((prevState) => prevState - 1)} label={"Previous"} />
                        ) : null}
                        {page < components.length - 1 ? (
                            <SimpleButton onClick={() => setPages((prevState) => prevState + 1)} label={"Next"} />
                        ) : (
                            <SimpleButton onClick={() => completeOnClick()} label={"Complete"} />
                        )}
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>
    )
}

export default FadeInOut
