import React from 'react';
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import {ROUTES} from './constant/routes';
import {Auth} from './context/AuthContext';

import './App.css'
import 'react-toastify/dist/ReactToastify.css';

const AnimatedSwitch = () => {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={2000}>
                <Routes>
                    {
                        ROUTES.map(route => {
                            return <Route path={route.path} element={route.component}/>

                        })
                    }
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};


function App() {
    return (
        <div>
            <ToastContainer position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover/>

            <Auth>
                <BrowserRouter>
                    <body
                        className={'bg-gradient-to-br from-yellow-50 to-yellow-100 bg-gradient-radial w-full min-h-screen max-h-full bg-fixed'}>
                    <AnimatedSwitch/>
                    </body>
                </BrowserRouter>
            </Auth>
        </div>
    )
}

export default App
;
