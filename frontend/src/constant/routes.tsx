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
import CreateExperience from "../pages/CreateExperience"

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
    component: (
        <div className={"bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl p-5"}>
            <div>
                <h2 className={"text-lg leading-6 font-medium text-gray-900"}>Create New Experience</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    The STAR (<strong>Situation</strong>, <strong>Task</strong>, <strong>Action</strong> and{" "}
                    <strong>Result</strong>) method helps you create an easy-to-follow story with a clear conflict and
                    resolution. By using this strategy, you can make sure you're fully addressing the interviewer's
                    question while also demonstrating how you were able to overcome previous challenges and be
                    successful.
                </p>
            </div>
            <CreateExperience companyDescriptionId={null} roleId={null} />
        </div>
    ),
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
