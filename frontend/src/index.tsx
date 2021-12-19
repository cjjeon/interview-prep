import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Auth0Provider } from "@auth0/auth0-react"
import { AUTH_CONFIG } from "./constant/configs"
import AuthApolloProvider from "./context/AuthApolloProvider"

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain={AUTH_CONFIG.domain}
            clientId={AUTH_CONFIG.clientId}
            redirectUri={window.location.origin}
            audience={`https://${AUTH_CONFIG.domain}/api/v2/`}
            scope={"read:current_user"}
        >
            <AuthApolloProvider>
                <App />
            </AuthApolloProvider>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
