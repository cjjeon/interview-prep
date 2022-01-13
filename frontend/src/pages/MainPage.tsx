import React from "react"
import { useNavigate } from "react-router-dom"
import { DASHBOARD_PAGE, LOGIN_PAGE } from "../constant/routes"
import { useAuth0 } from "@auth0/auth0-react"
import Loading from "../component/loading/Loading"

const MainPage: React.FC = () => {
    const navigate = useNavigate()
    const { isAuthenticated, isLoading } = useAuth0()

    const nextPage = () => {
        if (!isAuthenticated) {
            navigate(LOGIN_PAGE.path)
        } else {
            navigate(DASHBOARD_PAGE.path)
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={"flex flex-col items-center justify-center w-full h-screen gap-10 p-10"}>
            <h1 className={"text-5xl text-center"}>Need help on preparing interview?</h1>
            <div className={"text-lg text-center text-gray-400"}>
                <h3 className={"font"}>
                    Interview is not easy and it's more challenging if you are not prepare for it.
                </h3>
                <h3>This tool will help you to prepare for an interview and succeed getting the job you dream of!</h3>
            </div>
            <button className={"rounded bg-yellow-400 p-3 text-xl"} onClick={nextPage}>
                Let's Get Started!
            </button>
        </div>
    )
}

export default MainPage
