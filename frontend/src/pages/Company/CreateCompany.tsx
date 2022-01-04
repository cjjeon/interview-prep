import React, { useEffect, useState } from "react"
import FadeInOut from "../../component/transition/FadeInOut"
import InputTextArea from "../../component/inputs/InputTextArea"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { gql, useMutation, useQuery } from "@apollo/client"
import { CREATE_POSITION_PAGE } from "../../constant/routes"
import InputTextWithOptions from "../../component/inputs/InputTextWithOptions"

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
    }, [name])

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
        <div className={"flex flex-col justify-center h-screen w-full p-20 gap-10"}>
            <div>
                <h1 className={"text-3xl mb-5"}>Know The Company</h1>
                <div>
                    When you are doing interview, it's important to understand what company you are applying for. So,
                    take your time, look at their website, search their online presents, what they value.
                </div>
            </div>
            <div className={"flex flex-col gap-5"}>
                <FadeInOut
                    components={[
                        <div>
                            <div>What's the name of the company?</div>
                            <InputTextWithOptions
                                name={"company-name"}
                                label={"Enter name of the company"}
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
                                background={"transparent"}
                            />
                        </div>,
                        <div className={"flex flex-col gap-2"}>
                            <div>
                                Most interviewers are interested to know if the candidates are interested in the
                                company. So, they will ask questions such as "Can you tell us about our company?".
                            </div>
                            <div>
                                In your own word, describe about the company. It doesn't have to be long but it's
                                important for you write it out own your own word because it will help you remember.
                            </div>
                            <InputTextArea
                                name={"company-description"}
                                label={"In 50 ~ 100 words, can you tell me about the company?"}
                                value={description}
                                onChange={(value) => setDescription(value)}
                                background={"transparent"}
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
