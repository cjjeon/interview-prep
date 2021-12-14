import React, { useState } from "react"
import { toast } from "react-toastify"
import GoBackButton from "../component/buttons/GoBackButton"
import SimpleButton from "../component/buttons/SimpleButton"
import InputText from "../component/inputs/InputText"
import { supabase } from "../api/supabase"
import { LOGIN_PAGE } from "../constant/routes"

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("")

    const forgotYourPassword = () => {
        if (email === "") {
            toast.error("You must enter e-mail.", {})
        } else {
            supabase.auth.api.resetPasswordForEmail(email).then(({ error }) => {
                if (error) {
                    toast.error(error.message)
                } else {
                    toast.success("E-mail has been sent to reset password!")
                }
            })
        }
    }

    return (
        <div className={"flex justify-center items-center w-full h-screen"}>
            <div
                className={
                    "flex flex-col md:flex-row justify-center items-center text-center rounded-xl border-2 bg-white p-5 gap-5"
                }
            >
                <div className={"flex flex-col gap-5 px-10 pt-10 md:p-10"}>
                    <GoBackButton link={LOGIN_PAGE.path} />
                    <div>
                        <div className={"text-3xl font-bold uppercase"}>
                            Forgot your password
                        </div>
                    </div>
                    <div>
                        <InputText
                            name={"email"}
                            value={email}
                            type={"text"}
                            label={"Email Address"}
                            onChange={(value) => setEmail(value)}
                        />
                        <SimpleButton
                            label={"Forgot Your Password"}
                            onClick={forgotYourPassword}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
