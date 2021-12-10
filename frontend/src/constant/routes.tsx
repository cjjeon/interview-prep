import React from 'react'
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import MainPage from "../pages/MainPage";
import ForgotPassword from "../pages/ForgotPassword";

interface IRoute {
    path: string;
    component: React.ReactElement;
}

export const MAIN_PAGE: IRoute = {
    path: '/',
    component: <MainPage/>
}

export const FORGOT_PASSWORD_PAGE: IRoute = {
    path: '/forgot-password',
    component: <ForgotPassword/>
}

export const LOGIN_PAGE: IRoute = {
    path: '/login',
    component: <Login/>
}

export const SIGNUP_PAGE: IRoute = {
    path: '/signup',
    component: <SignUp/>
}

export const ROUTES: IRoute[] = [
    LOGIN_PAGE,
    SIGNUP_PAGE,
    FORGOT_PASSWORD_PAGE,
    MAIN_PAGE,
]