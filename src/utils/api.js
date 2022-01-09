import { BASE_URL } from '../config';

export const loginConfig = ({
    url: `${BASE_URL}/auth/login`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
})

export const registerUserConfig = ({
    url: `${BASE_URL}/auth/register`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
})

export const changePassConfig = ({
    url: `${BASE_URL}/auth/resetpassword`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})

export const resetPassConfig = ({
    url: `${BASE_URL}/auth/resetpassword/`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
})

export const createJobConfig = ({
    url: `${BASE_URL}/jobs`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
})

export const getJobConfig = ({
    url: `${BASE_URL}/jobs`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})