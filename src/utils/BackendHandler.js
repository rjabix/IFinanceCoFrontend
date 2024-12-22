import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL || require('../../package.json').backendUrl;

export const checkAuth = async () => {
    return (await axios.post(`${apiUrl}/checkauth`, {}, {withCredentials: true}))
                        .status === 200;
};