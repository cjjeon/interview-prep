import React, { useState } from "react"
import { Provider } from "@supabase/supabase-js"
import { FcGoogle } from "react-icons/fc"
import InputText from "../component/inputs/InputText"
import SimpleButton from "../component/buttons/SimpleButton"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import {
    COMPANY_LIST_PAGE,
    FORGOT_PASSWORD_PAGE,
    SIGNUP_PAGE,
} from "../constant/routes"
import { toast } from "react-toastify"
import {API_URL} from "../constant/configs";

const Login = () => {
    window.location.replace(`${API_URL}/login`)
    return null
}

export default Login
