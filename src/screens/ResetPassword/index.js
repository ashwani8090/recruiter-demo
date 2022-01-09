import React, { useEffect, useRef } from 'react';
import { MainModalScreen } from '../../components';
import { useForm } from "react-hook-form";
import useAxios from 'axios-hooks';
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'

import './styles.css';
import { resetPassConfig } from '../../utils/api';
import { setLoading } from '../../redux/slices/sessionSlice';

const ResetPassPassword = () => {
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const [{ data: resetPassData, loading, error }, executeresetPass] = useAxios(resetPassConfig, { manual: true });
    const password = useRef({});
    password.current = watch("password", "");
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const { password, confirmPassword } = data;
        const token = location?.state?.token;
        executeresetPass({
            data: {
                password,
                confirmPassword,
                token
            }
        })
    }

    useEffect(() => {
        if (resetPassData?.code == 201) {
            history.push('/login')
        }
    }, [resetPassData?.data])

    useEffect(() => {
        dispatch(setLoading(loading))
    }, [loading])

    useEffect(() => {
        dispatch(setLoading(false))
    }, [error?.response?.data?.message])


    return (<MainModalScreen
        style={{
            display: "flex",
            flexDirection: "column",
        }}
    >
        <div className="resetPass-container">
            <div className='resetPass-title '>ResetPass your password?</div>
            <form style={{ display: "flex", flexDirection: 'column', alignItems: 'start', width: '100%', justifyContent: 'space-evenly' }}
                onSubmit={handleSubmit(onSubmit)}>
                <div style={{ width: '100%', textAlign: 'start' }}>
                    <label>New Password*</label>
                    <input placeholder="Enter your password" className="register-input" {...register("password", {
                        required: true,
                        minLength: {
                            value: 6,
                            message: "Password must have at least 6 characters"
                        }
                    })} />
                </div>
                <div style={{ width: '100%', textAlign: 'start' }}>
                    <label>Confirm new Password*</label>
                    <input placeholder="Enter your password" className="register-input"
                        {...register("confirmPassword", {
                            validate: value =>
                                value === password.current || "The passwords do not match"
                        })} />
                </div>
                <span className="error">
                    {errors.password?.type === 'required' && "Field is required"}
                    {errors.password?.message || errors.confirmPassword?.message}
                </span>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <button
                        className="button"
                        type="submit">Submit</button>
                </div>
            </form>
            <div className='error'>{error?.response?.data?.message}</div>
        </div>
    </MainModalScreen>)
}

export default ResetPassPassword;