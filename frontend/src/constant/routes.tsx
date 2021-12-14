import React from "react"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import MainPage from "../pages/MainPage"
import ForgotPassword from "../pages/ForgotPassword"
import Companies from "../pages/Company/Companies"
import CreateCompany from "../pages/Company/CreateCompany"
import CreatePosition from "../pages/Position/CreatePosition"

interface IRoute {
    path: string
    component: React.ReactElement
}

export const MAIN_PAGE: IRoute = {
    path: "/",
    component: <MainPage />,
}

export const FORGOT_PASSWORD_PAGE: IRoute = {
    path: "/forgot-password",
    component: <ForgotPassword />,
}

export const LOGIN_PAGE: IRoute = {
    path: "/login",
    component: <Login />,
}

export const SIGNUP_PAGE: IRoute = {
    path: "/signup",
    component: <SignUp />,
}

// Company Pages
export const COMPANY_LIST_PAGE: IRoute = {
    path: "/company/list",
    component: <Companies />,
}

export const COMPANY_CREATE_PAGE: IRoute = {
    path: "/company/create",
    component: <CreateCompany />,
}

// Position Page
export const CREATE_POSITION_PAGE: IRoute = {
    path: "/company/:companyId/position/create",
    component: <CreatePosition />,
}

export const ROUTES: IRoute[] = [
    COMPANY_LIST_PAGE,
    COMPANY_CREATE_PAGE,
    CREATE_POSITION_PAGE,
    LOGIN_PAGE,
    SIGNUP_PAGE,
    FORGOT_PASSWORD_PAGE,
    MAIN_PAGE,
]
