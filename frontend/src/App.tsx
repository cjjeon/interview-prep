import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';

import {ROUTES} from './constant/routes';
import {Auth} from './context/AuthContext';

import 'react-toastify/dist/ReactToastify.css';

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
                <Router>
                    <body
                        className={'bg-gradient-to-br from-yellow-50 to-yellow-100 bg-gradient-radial w-full min-h-screen max-h-full bg-fixed'}>
                    <Routes>
                        {
                            ROUTES.map(route => {
                                return <Route path={route.path} element={route.component}/>

                            })
                        }
                    </Routes>
                    </body>
                </Router>
            </Auth>
        </div>
    )
}

export default App
;
