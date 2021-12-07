import React from 'react'
import Login from "../pages/Login";

interface IRoute {
    path: string;
    component: React.ReactElement;
}

const LOGIN_PAGE: IRoute = {
    path: '/login',
    component: <Login/>
}


export const ROUTES: IRoute[] = [
    LOGIN_PAGE,
]