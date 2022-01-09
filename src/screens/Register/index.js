import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import useAxios from 'axios-hooks';

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { registerUserConfig } from '../../utils/api';
import { setLoading } from '../../redux/slices/sessionSlice';
import './styles.css'
import { MainModalScreen } from "../../components";

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [{ data: response, loading, error: registerError }, registerService] = useAxios(registerUserConfig, { manual: true })

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
                        <input placeholder="Name" className="input" {...register("name", { required: true })} />
                    </div>
                    {errors.name?.type === 'required' && "Field is required"}
                    <div className="register-input-container">
                        <label>Email Address</label>
                        <input placeholder="Email" className="input" {...register("email", { required: true })} />
                    </div>
                    {errors.name?.type === 'required' && "Field is required"}
                    <div className="register-input-container" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="row-cell">
                            <label>Create Password*</label>
                            <input placeholder="Enter your password" className="input" {...register("password", { required: true })} />
                        </div>
                        <div className="row-cell">
                            <label>Confirm Password*</label>
                            <input placeholder="Enter your password" className="input" {...register("confirmPassword", { required: true })} />
                        </div>
                    </div>
                    {errors.name?.type === 'required' && "Field is required"}
                    <div className="register-input-container">
                        <label>Skills*</label>
                        <input placeholder="Enter comma separated skills" className="input" {...register("skills")} />
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

