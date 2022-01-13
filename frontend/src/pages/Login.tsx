import { useAuth0 } from "@auth0/auth0-react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { DASHBOARD_PAGE } from "../constant/routes"

const Login: React.FC = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0()
    const navigate = useNavigate()

    if (isAuthenticated) {
        navigate(DASHBOARD_PAGE.path)
    } else {
        loginWithRedirect()
    }
    return null
}

export default Login
