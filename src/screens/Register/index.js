import React, { useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import useAxios from 'axios-hooks';
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import { registerUserConfig } from '../../utils/api';
import { setLoading } from '../../redux/slices/sessionSlice';
import './styles.css'
import { MainModalScreen } from "../../components";

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const [{ data: response, loading, error: registerError }, registerService] = useAxios(registerUserConfig, { manual: true })
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = data => {
        registerService({ data: { ...data, userRole: 0 } });
    }

    useEffect(() => {
        if (response) {
            history.push('/login');
            dispatch(setLoading(false));
        }
    }, [response])

    useEffect(() => {
        dispatch(setLoading(false))
    }, [registerError])

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
            <div className="register-container">
                <form
                    style={{ display: "flex", flexDirection: 'column', alignItems: 'start', width: '100%', justifyContent: 'space-evenly' }}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="register-title">Signup</div>
                    <div className="register-input-container">
                        <label>Full Name</label>
                        <input placeholder="Name" className="register-input" {...register("name", { required: true })} />
                        <span className="error">
                            {errors.name?.type === 'required' && "Field is required"}
                        </span>
                    </div>

                    <div className="register-input-container">
                        <label>Email Address</label>
                        <input placeholder="Email" className="register-input"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                    message: 'Invalid email address.'
                                }
                            })} />
                        <span className="error">
                            {errors.email?.type === 'required' && "Field is required"}
                            {errors.email?.message}
                        </span>
                    </div>
                    <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div className="register-input-container" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div className="row-cell">
                                <label>Create Password*</label>
                                <input placeholder="Enter your password" className="register-input" {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 6,
                                        message: "Password must have at least 6 characters"
                                    }
                                })} />
                            </div>
                            <div className="row-cell">
                                <label>Confirm Password*</label>
                                <input placeholder="Enter your password" className="register-input"
                                    {...register("confirmPassword", {
                                        validate: value =>
                                            value === password.current || "The passwords do not match"
                                    })} />
                            </div>
                        </div>
                        <span className="error">
                            {errors.password?.type === 'required' && "Field is required"}
                            {errors.password?.message || errors.confirmPassword?.message}
                        </span>
                    </div>
                    <div className="register-input-container">
                        <label>Skills*</label>
                        <input placeholder="Enter comma separated skills" className="register-input" {...register("skills")} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <button
                            className="register-button"
                            type="submit">Signup</button>
                    </div>
                    <div style={{ color: 'red' }}>
                        <div style={{ fontSize: 12, margin: 10 }}>{registerError?.response?.data?.errors?.[0]?.password}</div>
                        <div style={{ fontSize: 12, margin: 10 }}>{registerError?.response?.data?.errors?.[0]?.name}</div>
                        <div style={{ fontSize: 12, margin: 10 }}>{registerError?.response?.data?.message}</div>
                    </div>
                    <div style={{ width: '100%' }}>Have an account?
                        <Link style={{ color: '#43AFFF', marginInlineStart: 10 }} to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </MainModalScreen>)
}

export default SignUp;

