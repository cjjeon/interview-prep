export const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://localhost:5000"

export const AUTH_CONFIG = {
    domain: process.env.REACT_APP_AUTH_DOMAIN ? process.env.REACT_APP_AUTH_DOMAIN : "",
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID ? process.env.REACT_APP_AUTH_CLIENT_ID : "",
}
