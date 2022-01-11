import React from "react"
import Login from "../pages/Login"
import MainPage from "../pages/MainPage"
import Companies from "../pages/Company/Companies"
import CreateCompany from "../pages/CreateCompany"
import CreateRole from "../pages/CreateRole"
import Logout from "../pages/Logout"
import Interview from "../pages/Interview"
import MockInterview from "../pages/components/MockInterview"

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

// Role Page
export const INTERVIEW_PAGE: IRoute = {
    path: "/company/:companyDescriptionId/position/:roleId",
    component: <Interview />,
}

// Role Page
export const MOCK_INTERVIEW_PAGE: IRoute = {
    path: "/company/:companyDescriptionId/position/:roleId/mock-interview",
    component: <MockInterview />,
}

export const ROUTES: IRoute[] = [
    COMPANY_LIST_PAGE,
    COMPANY_CREATE_PAGE,
    CREATE_POSITION_PAGE,
    MOCK_INTERVIEW_PAGE,
    INTERVIEW_PAGE,
    LOGIN_PAGE,
    LOGOUT_PAGE,
    MAIN_PAGE,
]
