import React, { useRef } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { CSSTransition } from "react-transition-group"

import { ROUTES } from "./constant/routes"

import "./App.css"
import "react-toastify/dist/ReactToastify.css"

const AnimatedSwitch = () => {
    const location = useLocation()
    const nodeRef = useRef<HTMLDivElement>(null)
    return (
        <CSSTransition nodeRef={nodeRef} key={location.key} classNames="fade" timeout={500}>
            <div ref={nodeRef}>
                <Routes>
                    {ROUTES.map((route, index) => {
                        return <Route key={index} path={route.path} element={route.component} />
                    })}
                </Routes>
            </div>
        </CSSTransition>
    )
}

function App() {
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
                    <AnimatedSwitch />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
