import React, { useEffect } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { CSSTransition } from "react-transition-group"

interface ModalProps {
    isOpen: boolean
    title: string
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
    const nodeRef = React.useRef<HTMLDivElement>(null)
    const modalRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        // This is method to see if the user click outside of the modal which will make
        // the model close.
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [modalRef, onClose])

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
                            <div className={"flex justify-between gap-2"}>
                                <div className={"text-lg leading-6 font-medium text-gray-900"}>{title}</div>
                                <div className={"bg-red-200 rounded cursor-pointer"} onClick={onClose}>
                                    <IoCloseOutline size={25} />
                                </div>
                            </div>
                            {isOpen ? <div>{children}</div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Modal
