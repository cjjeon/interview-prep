import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {ROUTES} from "./constant/routes";

function App() {
    return (
        <Router>
            <Routes>
                {ROUTES.map(route => {
                    return <Route path={route.path} element={route.component}/>

                })}
            </Routes>
        </Router>
    );
}

export default App;
