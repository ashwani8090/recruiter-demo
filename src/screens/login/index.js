import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import useAxios from 'axios-hooks';

import { setAccessToken, setUserDetails } from '../../redux/slices/persistedSlice';
import { setLoading } from '../../redux/slices/sessionSlice';
import { loginConfig } from '../../utils/api';
import './styles.css'
import { MainModalScreen } from "../../components";


const Login = () => {
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [{ data: loginData, loading, error }, executeLogin] = useAxios(loginConfig, { manual: true });

    const onSubmit = useCallback(
        (data) => {
            const { email, password } = data;
            executeLogin({
                data: {
                    email, password
                }
            })
        }, []
    )

    useEffect(() => {
        if (loginData?.data?.token) {
            dispatch(setAccessToken(loginData?.data?.token))
            dispatch(setUserDetails(loginData?.data))
            dispatch(setLoading(false))
        }
    }, [loginData])

    useEffect(() => {
        if (error?.response?.data?.message) {
            setLoginError(error?.response?.data?.message)
        }
        dispatch(setLoading(false))
    }, [error?.response?.data?.message])

    useEffect(() => {
        dispatch(setLoading(loading))
    }, [loading])


    return (
        <MainModalScreen
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div className="container">
                <form onChange={() => setLoginError(null)} style={{ display: "flex", flexDirection: 'column', alignItems: 'start', width: '100%', justifyContent: 'space-evenly' }}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="login-title">LOGIN</div>
                    <div className="input-container">
                        <label>Email address</label>
                        <input placeholder="Enter your email" className="input" {...register("email", { required: true })} />
                        <span className="error">
                            {errors.email?.type === 'required' && "Field is required"}
                        </span>
                    </div>
                    <div className="input-container">
                        <div style={{ marginBottom: 8, display: 'flex', justifyContent: "space-between", width: '100%' }}>
                            <label>Password</label>
                            <Link style={{ color: '#43AFFF', marginInlineStart: 10, fontSize: 14 }} to="/forgot">Forgot Password</Link>
                        </div>
                        <input placeholder="Enter your password" className="input" {...register("password", { required: true })} />
                        <span className="error">
                            {errors.password?.type === 'required' && "Field is required"}
                        </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <button
                            className="button"
                            type="submit">Login</button>
                    </div>
                    <span className="error">{loginError}</span>
                    <div style={{ width: '100%' }}>New to MyJobs?
                        <Link style={{ color: '#43AFFF', marginInlineStart: 10 }} to="/register">Create an account</Link>
                    </div>
                </form>
            </div >
        </MainModalScreen >)
}


export default Login;

