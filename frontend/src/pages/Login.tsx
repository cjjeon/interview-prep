import React, {useState} from "react";
import {Provider} from "@supabase/supabase-js";
import {FcGoogle} from 'react-icons/fc'
import InputText from "../component/inputs/InputText";
import SimpleButton from "../component/buttons/SimpleButton";
import {useAuth} from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {COMPANY_LIST_PAGE, FORGOT_PASSWORD_PAGE, SIGNUP_PAGE} from "../constant/routes";

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {login} = useAuth()
    const navigate = useNavigate()

    const handleOAuthLogin = async (provider: Provider) => {
        login(undefined, undefined, provider)
    };


    return (
        <div
            className={
                "flex justify-center items-center w-full h-screen"
            }
        >
            <div
                className={'flex flex-col md:flex-row justify-center items-center text-center rounded-xl border-2 bg-white p-5 gap-5'}>
                <div className={'flex flex-col gap-5 border-0 md:border-r-2 px-10 pt-10 md:p-10'}>
                    <div>
                        <div className={'text-3xl font-bold uppercase'}>
                            Login
                        </div>
                    </div>
                    <div>
                        <InputText name={'email'} value={email} type={'text'} label={'Email Address'}
                                   onChange={(value) => setEmail(value)}/>
                        <InputText name={'password'} value={password} type={'password'} label={'Password'}
                                   onChange={(value) => setPassword(value)}/>
                        <div className={'pb-2'}>
                            <Link className={'text-sm text-blue-300 underline my-2'} to={FORGOT_PASSWORD_PAGE.path}>Forgot
                                your Password?</Link>
                        </div>
                        <SimpleButton label={'Login'} onChange={() => login(email, password)}/>
                    </div>
                    <div>
                        <Link className={'text-right text-base text-blue-300 my-2'} to={SIGNUP_PAGE.path}>Create Account
                            Using Email</Link>
                    </div>
                </div>
                <div className={'flex flex-col gap-5 px-10 md:p-10 w-96'}>
                    <SimpleButton label={'Login with Google'} onChange={() => handleOAuthLogin('google')} color={'red'}
                                  icon={<FcGoogle size={30}/>}/>
                    <SimpleButton label={'Try Without Login'} onChange={() => navigate(COMPANY_LIST_PAGE.path)}
                                  color={'indigo'}/>
                </div>
            </div>
        </div>);
};

export default Login;