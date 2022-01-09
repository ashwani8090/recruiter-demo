import React, { useEffect } from 'react';
import { MainModalScreen } from '../../components';
import { useForm } from "react-hook-form";
import useAxios from 'axios-hooks';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'

import './styles.css';
import { changePassConfig } from '../../utils/api';
import { setLoading } from '../../redux/slices/sessionSlice';

const ForgotPassword = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [{ data: forgotData, loading, error }, executeforgot] = useAxios(changePassConfig, { manual: true });
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const { email } = data;
        executeforgot({
            params: {
                email
            }
        })
    }

    useEffect(() => {
        if (forgotData?.data) {
            history.push({ pathname: '/reset', state: { token: forgotData?.data?.token } })
        }
    }, [forgotData?.data])

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
        <div className="forgot-container">
            <div className='forgot-title '>Forgot your password?</div>
            <div className='forgot-subtitle '>Enter the email associated with your account and we’ll send you instructions to reset your password.</div>
            <form style={{ display: "flex", flexDirection: 'column', alignItems: 'start', width: '100%', justifyContent: 'space-evenly' }}
                onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <label>Email address</label>
                    <input placeholder="Email" className="forgot-input"
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

export default ForgotPassword;