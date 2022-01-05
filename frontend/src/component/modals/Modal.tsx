import React, { useEffect } from "react"
import { CSSTransition } from "react-transition-group"

import SimpleButton from "../buttons/SimpleButton"
import "./Modal.css"

interface ModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, title, children }) => {
    const nodeRef = React.useRef<HTMLDivElement>(null)
    const modalRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [modalRef, setIsOpen])

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={isOpen}
            timeout={400}
            classNames={{
                enter: "opacity-0",
                enterActive: "ease-out duration-300 opacity-100",
                exit: "ease-linear duration-300 opacity-0",
            }}
            unmountOnExit
        >
            <div ref={nodeRef}>
                <div className={"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"} />
                <div className={"fixed z-10 inset-0 overflow-y-auto"}>
                    <div className={"flex justify-center items-center w-full h-full text-left"}>
                        <div ref={modalRef} className={"flex flex-col gap-3 bg-white w-2/3 rounded-lg p-5"}>
                            <div className={"text-lg leading-6 font-medium text-gray-900"}>{title}</div>
                            <div>{children}</div>
                            <div className={"flex gap-2"}>
                                <div className={"w-16"}>
                                    <SimpleButton label={"Okay"} onClick={() => setIsOpen(false)} />
                                </div>
                                <div className={"w-16"}>
                                    <SimpleButton color={"red"} label={"Close"} onClick={() => setIsOpen(false)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Modal
