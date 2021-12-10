import React, {useState} from 'react';
import SimpleButton from '../component/buttons/SimpleButton';
import InputText from '../component/inputs/InputText';
import GoBackButton from "../component/buttons/GoBackButton";
import {useNavigate} from "react-router-dom";
import {supabase} from "../constant/supabase";
import {LOGIN_PAGE} from "../constant/routes";
import {toast} from "react-toastify";

const SignUp = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()

    const signUp = () => {
        supabase.auth.signUp({email, password}).then(({error}) => {
            if (error) {
                toast.error(error.message)
            }
            navigate(LOGIN_PAGE.path)
        })
    }

    return (
        <div
            className={
                "flex justify-center items-center w-full h-screen"
            }>
            <div
                className={'flex flex-col md:flex-row justify-center items-center text-center rounded-xl border-2 bg-white p-5 gap-5'}>
                <div className={'flex flex-col gap-5 px-10 pt-10 md:p-10'}>
                    <GoBackButton/>
                    <div>
                        <div className={'text-3xl font-bold uppercase'}>
                            Email Sign Up
                        </div>
                    </div>
                    <div>
                        <InputText name={'email'} value={email} type={'text'} label={'Email Address'}
                                   onChange={(value) => setEmail(value)}/>
                        <InputText name={'password'} value={password} type={'password'} label={'Password'}
                                   onChange={(value) => setPassword(value)}/>
                        <SimpleButton label={'Sign Up'} onChange={signUp}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SignUp;