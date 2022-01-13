import React from "react"
import { gql, useQuery } from "@apollo/client"
import Loading from "../component/loading/Loading"
import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/solid"
import { useAuth0 } from "@auth0/auth0-react"
import { Disclosure } from "@headlessui/react"
import { useNavigate } from "react-router-dom"
import { COMPANY_CREATE_PAGE, CREATE_EXPERIENCE_PAGE, CREATE_POSITION_PAGE, INTERVIEW_PAGE } from "../constant/routes"
import Collapse from "../component/transition/Collapse"

const GET_COMPANIES = gql`
    query {
        companyDescriptions {
            id
            description
            company {
                name
            }
            roles {
                id
                name
                skills {
                    name
                }
            }
        }
    }
`

interface GetCompany {
    companyDescriptions: {
        id: string
        description: string
        company: {
            name: string
        }
        roles: {
            id: string
            name: string
            skills: {
                name: string
            }[]
        }[]
    }[]
}

const Companies: React.FC = () => {
    const { data, loading } = useQuery<GetCompany>(GET_COMPANIES)
    const navigate = useNavigate()
    if (loading || !data) {
        return <Loading />
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className={"border-b-2 border-dashed p-3 flex justify-between gap-2 md:gap-14"}>
                <div>
                    <h2 className={"text-lg leading-6 font-medium text-gray-900"}>Company</h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        List of companies that you've prepared interviewed in the past
                    </p>
                </div>
                <div>
                    <button
                        className={
                            "bg-amber-200 rounded p-2 cursor-pointer flex gap-2 hover:bg-amber-300 justify-center items-center"
                        }
                        onClick={() => navigate(COMPANY_CREATE_PAGE.path)}
                    >
                        <PlusCircleIcon className={"h-5 w-5"} />
                        <div className={"text-xs md:text-sm"}>New Company</div>
                    </button>
                </div>
            </div>
            <div className="divide-y divide-gray-200">
                {data.companyDescriptions.map((companyDescription) => (
                    <Disclosure key={companyDescription.id}>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className={"text-left block hover:bg-gray-100 w-full"}>
                                    <div className="py-2 flex items-center px-6">
                                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <div className="flex flex-col text-sm">
                                                    <p className="font-medium text-indigo-600 truncate">
                                                        {companyDescription.company.name}
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                                        {companyDescription.description}
                                                    </p>
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
                                    <div className={"bg-blue-200 w-2"} />
                                    <div className={"py-2 px-6 w-full"}>
                                        <div className={"w-full my-2"}>
                                            <div className={"flex justify-between items-center mb-2"}>
                                                <div>
                                                    <h2 className={"leading-6 font-medium text-gray-900"}>Role</h2>
                                                </div>
                                                <div className={"flex justify-center"}>
                                                    <button
                                                        className={
                                                            "bg-amber-200 rounded p-2 cursor-pointer flex gap-2 hover:bg-amber-300 justify-center items-center"
                                                        }
                                                        onClick={() =>
                                                            navigate(
                                                                CREATE_POSITION_PAGE.path.replace(
                                                                    ":companyDescriptionId",
                                                                    companyDescription.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <PlusCircleIcon className={"h-5 w-5"} />
                                                        <div className={"text-xs md:text-sm"}>New Role</div>
                                                    </button>
                                                </div>
                                            </div>
                                            {companyDescription.roles.length > 0 ? (
                                                companyDescription.roles.map((role) => {
                                                    return (
                                                        <div
                                                            key={role.id}
                                                            className={
                                                                "border rounded w-full flex justify-between items-center px-3 py-1 cursor-pointer hover:bg-gray-100"
                                                            }
                                                            onClick={() =>
                                                                navigate(
                                                                    INTERVIEW_PAGE.path
                                                                        .replace(
                                                                            ":companyDescriptionId",
                                                                            companyDescription.id
                                                                        )
                                                                        .replace(":roleId", role.id)
                                                                )
                                                            }
                                                        >
                                                            <div>
                                                                <div
                                                                    className={
                                                                        "text-sm font-medium text-indigo-600 mb-1"
                                                                    }
                                                                >
                                                                    {role.name}
                                                                </div>
                                                                <div
                                                                    className={"text-xs flex flex-wrap gap-x-3 gap-y-1"}
                                                                >
                                                                    {role.skills.map((skill) => {
                                                                        return (
                                                                            <div
                                                                                className={
                                                                                    "bg-indigo-200 rounded-full px-2"
                                                                                }
                                                                            >
                                                                                {skill.name}
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>

                                                            <ChevronRightIcon
                                                                className={`h-5 w-5 text-gray-400`}
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <div
                                                    className={
                                                        "flex justify-center items-center py-3 block text-sm font-medium text-gray-900"
                                                    }
                                                >
                                                    No Roles has been added
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Collapse>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>
        </div>
    )
}

const GET_EXPERIENCES = gql`
    query {
        experiences {
            id
            summary
        }
    }
`

interface GetExperiences {
    experiences: {
        id: number
        summary: string
    }[]
}

const Experiences: React.FC = () => {
    const { data, loading } = useQuery<GetExperiences>(GET_EXPERIENCES)
    const navigate = useNavigate()

    if (loading || !data) return <Loading />

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className={"border-b-2 border-dashed p-3 flex justify-between gap-2 md:gap-14"}>
                <div>
                    <h2 className={"text-lg leading-6 font-medium text-gray-900"}>Experience / Project</h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        List of your past experiences / projects that you can use to during the interview
                    </p>
                </div>
                <div>
                    <button
                        className={
                            "bg-amber-200 rounded p-2 cursor-pointer flex gap-2 hover:bg-amber-300 justify-center items-center"
                        }
                        onClick={() => navigate(CREATE_EXPERIENCE_PAGE.path)}
                    >
                        <PlusCircleIcon className={"h-5 w-5"} />
                        <div className={"text-xs md:text-sm"}>New Experience</div>
                    </button>
                </div>
            </div>
            <div>
                {data.experiences.length === 0 ? (
                    <div className={"flex justify-center items-center py-5 block text-sm font-medium text-gray-900"}>
                        No Experiences / Project has been added
                    </div>
                ) : null}
            </div>
        </div>
    )
}

const Dashboard = () => {
    const { user, isLoading } = useAuth0()

    if (isLoading || !user) return <Loading />

    return (
        <div className={"flex flex-col gap-10"}>
            <div>
                <h1 className={"text-xl leading-6 font-medium text-gray-900"}>Hi! {user.name}</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Welcome Back! I hope you can <strong className={"font-bold"}>ACE</strong> your next interview!
                </p>
            </div>
            <div>
                <Companies />
            </div>
            <div>
                <Experiences />
            </div>
        </div>
    )
}

export default Dashboard
