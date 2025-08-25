import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `bearer ${token}`
        // console.log(`bearer ${token}`);
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
    );

    // function for 401, 403 status
    axiosSecure.interceptors.response.use(function onFulfilled(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async function onRejected(error) {
        const status = error.response.status
        if (status === 401 || status === 403) {
            await logout()
            navigate('/login');

        }
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;