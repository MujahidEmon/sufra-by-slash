import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const query = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await axiosSecure.get('/cart')
            return res.data;
        }
    })
    return query.data;
};

export default useCart;