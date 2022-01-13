import React from "react"
import Collapse from "../transition/Collapse"
import { ChevronRightIcon } from "@heroicons/react/solid"
import { Disclosure } from "@headlessui/react"

interface CollapsibleItemProps {
    title: string
    detail: React.ReactElement
    subtitle?: string
}

const CollapsibleItem: React.FC<CollapsibleItemProps> = ({ title, detail, subtitle }) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className={"text-left block hover:bg-gray-100 w-full"}>
                        <div className="py-2 flex items-center px-6">
                            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <div className="flex flex-col text-sm">
                                        <p className="font-medium text-indigo-600 truncate">{title}</p>
                                        {subtitle ? (
                                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{subtitle}</p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="ml-5 flex-shrink-0">
                                <ChevronRightIcon
                                    className={`${open ? "transform rotate-90" : ""} h-5 w-5 text-gray-400`}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </Disclosure.Button>
                    <Collapse isOpen={open}>
                        <div className={"flex"}>
                            <div className={"bg-blue-200 w-2"} />
                            <div className={"py-2 px-6 w-full"}>{detail}</div>
                        </div>
                    </Collapse>
                </>
            )}
        </Disclosure>
    )
}

interface CollapsibleProps {
    items: CollapsibleItemProps[]
}

const Collapsible: React.FC<CollapsibleProps> = ({ items }) => {
    return (
        <div className="divide-y divide-gray-200">
            {items.map((collapsible, index) => {
                return (
                    <CollapsibleItem
                        key={index}
                        title={collapsible.title}
                        subtitle={collapsible.subtitle}
                        detail={collapsible.detail}
                    />
                )
            })}
        </div>
    )
}

export default Collapsible
