import React, { useState } from "react"
import InputText from "../../component/inputs/InputText"
import FadeInOut from "../../component/transition/FadeInOut"
import InputTextArea from "../../component/inputs/InputTextArea"
import { toast } from "react-toastify"
import { createCompany } from "../../api/supabase"
import { useNavigate } from "react-router-dom"
import { CREATE_POSITION_PAGE } from "../../constant/routes"

interface CreateCompanyProps {}

const CreateCompany: React.FC<CreateCompanyProps> = () => {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const navigate = useNavigate()

    const create = () => {
        if (name === "") {
            toast.error("Please enter the company name!")
        } else if (description === "") {
            toast.error("Please summarize about the company!")
        } else {
            createCompany({
                name,
                description,
            }).then(({ data, error }) => {
                if (error) {
                    console.error(error.message)
                    toast.error("Fail to create company")
                } else {
                    console.log(data)
                    navigate(CREATE_POSITION_PAGE.path)
                }
            })
        }
    }

    return (
        <div className={"flex flex-col justify-center h-screen w-full p-20 gap-10"}>
            <div>
                <h1 className={"text-3xl mb-5"}>Know The Company</h1>
                <div>
                    When you are doing interview, it's important to understand what
                    company you are applying for. So, take your time, look at their
                    website, search their online presents, what they value.
                </div>
            </div>
            <div className={"flex flex-col gap-5"}>
                <FadeInOut
                    components={[
                        <div>
                            <div>What's the name of the company?</div>
                            <InputText
                                name={"company-name"}
                                label={"Enter name of the company"}
                                value={name}
                                type={"text"}
                                onChange={(value) => setName(value)}
                                background={"transparent"}
                            />
                        </div>,
                        <div className={"flex flex-col gap-2"}>
                            <div>
                                Most interviewers are interested to know if the
                                candidates are interested in the company. So, they
                                will ask questions such as "Can you tell us about our
                                company?".
                            </div>
                            <div>
                                In your own word, describe about the company. It
                                doesn't have to be long but it's important for you
                                write it out own your own word because it will help
                                you remember.
                            </div>
                            <InputTextArea
                                name={"company-description"}
                                label={
                                    "In 50 ~ 100 words, can you tell me about the company?"
                                }
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
