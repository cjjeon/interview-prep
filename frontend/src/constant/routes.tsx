import React from "react"
import Login from "../pages/Login"
import MainPage from "../pages/MainPage"
import CreateCompany from "../pages/CreateCompany"
import CreateRole from "../pages/CreateRole"
import Logout from "../pages/Logout"
import InterviewPrep from "../pages/InterviewPrep"
import MockInterview from "../pages/MockInterview"
import ViewMockInterview from "../pages/ViewMockInterview"
import Dashboard from "../pages/Dashboard"
import AddExperience from "../pages/AddExperience"

interface IRoute {
    path: string
    isPrivate?: boolean
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

export const DASHBOARD_PAGE: IRoute = {
    path: "/dashboard",
    isPrivate: true,
    component: <Dashboard />,
}

export const COMPANY_CREATE_PAGE: IRoute = {
    path: "/company/create",
    isPrivate: true,
    component: <CreateCompany />,
}

export const CREATE_POSITION_PAGE: IRoute = {
    path: "/company/:companyDescriptionId/position/create",
    isPrivate: true,
    component: <CreateRole />,
}

export const CREATE_EXPERIENCE_PAGE: IRoute = {
    path: "/experience/create",
    isPrivate: true,
    component: <AddExperience companyDescriptionId={null} roleId={null} />,
}

export const INTERVIEW_PAGE: IRoute = {
    path: "/company/:companyDescriptionId/position/:roleId",
    isPrivate: true,
    component: <InterviewPrep />,
}

export const MOCK_INTERVIEW_PAGE: IRoute = {
    path: "/company/:companyDescriptionId/position/:roleId/mock-interview",
    isPrivate: true,
    component: <MockInterview />,
}

export const MOCK_INTERVIEW_VIEW_PAGE: IRoute = {
    path: "/company/:companyDescriptionId/position/:roleId/mock-interview/:mockInterviewId",
    isPrivate: true,
    component: <ViewMockInterview />,
}

export const ROUTES: IRoute[] = [
    COMPANY_CREATE_PAGE,
    CREATE_EXPERIENCE_PAGE,
    CREATE_POSITION_PAGE,
    MOCK_INTERVIEW_VIEW_PAGE,
    MOCK_INTERVIEW_PAGE,
    INTERVIEW_PAGE,
    DASHBOARD_PAGE,
    LOGIN_PAGE,
    LOGOUT_PAGE,
    MAIN_PAGE,
]
