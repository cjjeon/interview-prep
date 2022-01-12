import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { MAIN_PAGE, ROUTES } from "./constant/routes"

import "react-toastify/dist/ReactToastify.css"
import Example from "./pages/Test"
import { useAuth0 } from "@auth0/auth0-react"
import Loading from "./component/loading/Loading"

function App() {
    const { isAuthenticated, isLoading } = useAuth0()
    if (isLoading) return <Loading />

    return (
        <div
            className={
                "bg-gradient-to-br from-yellow-50 to-yellow-100 bg-gradient-radial w-full min-h-screen max-h-full bg-fixed flex justify-center items-center"
            }
        >
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <BrowserRouter>
                <div className={"max-w-screen-lg"}>
                    <Routes>
                        {ROUTES.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        route.isPrivate && !isAuthenticated ? (
                                            <Navigate to={MAIN_PAGE.path} />
                                        ) : (
                                            route.component
                                        )
                                    }
                                />
                            )
                        })}
                        <Route path={"/test"} element={<Example />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
