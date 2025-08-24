import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePayment = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data: payments = [], refetch} = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            // console.log(res.data);
            return res.data
        }
    })
    return [payments, refetch]
};

export default usePayment;