import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL || require('../../package.json').backendUrl;

export const checkAuth = async () => {
    return (await axios.post(`${apiUrl}/checkauth`, {}, {withCredentials: true}))
                        .status === 200;
};

export const Login = async (email, password) => {
    return await axios.post(`${apiUrl}/identity/login`, {email: email, password: password}, {withCredentials: true});
};

export const SignUp = async (email, password) => {
    return await axios.post(`${apiUrl}/identity/register`, {email: email, password: password}, {withCredentials: true});
};