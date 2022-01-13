import React, { useEffect, useState } from "react"
import FadeInOut from "../component/transition/FadeInOut"
import InputTextArea from "../component/inputs/InputTextArea"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { gql, useMutation, useQuery } from "@apollo/client"
import { CREATE_POSITION_PAGE } from "../constant/routes"
import InputTextWithOptions from "../component/inputs/InputTextWithOptions"

const GET_COMPANIES = gql`
    query GetCompanies($filterName: String) {
        searchCompanies(filterName: $filterName) {
            companies {
                name
            }
        }
    }
`

const CREATE_COMPANY = gql`
    mutation CreateCompany($name: String!, $description: String!) {
        createCompanyDescription(name: $name, description: $description) {
            companyDescription {
                id
            }
        }
    }
`

const CreateCompany: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const { data, loading, refetch } = useQuery(GET_COMPANIES, {
        variables: { filterName: "" },
    })
    const [createCompany] = useMutation(CREATE_COMPANY)

    const navigate = useNavigate()

    useEffect(() => {
        refetch({
            filterName: name,
        }).then()
    }, [name, refetch])

    const create = () => {
        if (name === "") {
            toast.error("Please enter the company name!")
        } else if (description === "") {
            toast.error("Please summarize about the company!")
        } else {
            createCompany({
                variables: {
                    name,
                    description,
                },
            }).then(({ data, errors }) => {
                if (errors) {
                    toast.error(errors)
                } else {
                    if (data && data.createCompanyDescription) {
                        navigate(
                            CREATE_POSITION_PAGE.path.replace(
                                ":companyDescriptionId",
                                data.createCompanyDescription.companyDescription.id
                            )
                        )
                    }
                }
            })
        }
    }

    return (
        <div className={"bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl"}>
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Know The Company</h3>
                <p className="mt-1 text-sm text-gray-500">
                    When you are doing interview, it's important to understand what company you are applying for. So,
                    take your time, look at their website, search their online presents, what they value.
                </p>
            </div>
            <div className={"flex flex-col gap-5 px-4 sm:px-6 mb-3"}>
                <FadeInOut
                    components={[
                        <div>
                            <InputTextWithOptions
                                name={"company-name"}
                                label={"What's the name of the company?"}
                                value={name}
                                type={"text"}
                                onChange={(value) => setName(value)}
                                options={
                                    loading
                                        ? []
                                        : data && data?.searchCompanies && data?.searchCompanies?.companies
                                        ? data.searchCompanies.companies.map((company: any) => company.name)
                                        : []
                                }
                                placeholder={"Example: Facebook or Google"}
                                background={"transparent"}
                            />
                        </div>,
                        <div>
                            <div className={"flex flex-col gap-2 block text-sm font-medium text-gray-700 mb-3"}>
                                <div>
                                    Some interviewers are interested to know if the candidates are interested in the
                                    company. So, they will ask questions such as "Can you tell us about our company?".
                                </div>
                                <div>
                                    In your own word, describe about the company. It doesn't have to be long but it's
                                    important for you write it out own your own word because it will help you remember.
                                </div>
                            </div>
                            <InputTextArea
                                name={"company-description"}
                                placeholder={
                                    "Example: I read on your website that you’re one of the top data security companies in the US, and that you serve more than 40 Fortune 500 companies including some of the biggest tech companies like Microsoft and IBM. I also read a recent news article that mentioned you’re looking to expand into providing these services for financial institutions as well. Is that right? And can you tell me more about that?"
                                }
                                value={description}
                                onChange={(value) => setDescription(value)}
                            />
                        </div>,
                    ]}
                    completeOnClick={create}
                />
            </div>
        </div>
    )
}

export default CreateCompany
