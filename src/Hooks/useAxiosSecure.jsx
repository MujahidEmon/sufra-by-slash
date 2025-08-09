import axios from "axios";

export const useAxios = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    return useAxios;
};

export default useAxiosSecure;