import React from "react"
import Login from "../pages/Login"
import MainPage from "../pages/MainPage"
import Companies from "../pages/Company/Companies"
import CreateCompany from "../pages/Company/CreateCompany"
import CreateRole from "../pages/Role/CreateRole"
import Logout from "../pages/Logout"

interface IRoute {
    path: string
    component: React.ReactElement
}

export const MAIN_PAGE: IRoute = {
    path: "/",
    component: <MainPage />,
}

export const LOGIN_PAGE: IRoute = {
    path: "/login",
    component: <Login />,
}

export const LOGOUT_PAGE: IRoute = {
    path: "/logout",
    component: <Logout />,
}

// Company Pages
export const COMPANY_LIST_PAGE: IRoute = {
    path: "/company",
    component: <Companies />,
}

export const COMPANY_CREATE_PAGE: IRoute = {
    path: "/company/create",
    component: <CreateCompany />,
}

// Role Page
export const CREATE_POSITION_PAGE: IRoute = {
    path: "/company/:companyDescriptionId/position/create",
    component: <CreateRole />,
}

export const ROUTES: IRoute[] = [
    COMPANY_LIST_PAGE,
    COMPANY_CREATE_PAGE,
    CREATE_POSITION_PAGE,
    LOGIN_PAGE,
    LOGOUT_PAGE,
    MAIN_PAGE,
]
