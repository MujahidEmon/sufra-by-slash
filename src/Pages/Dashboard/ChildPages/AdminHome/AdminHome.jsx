import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaTruck, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: stats = [] } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('admin-stats')
            return res.data
        }
    })

    console.log(stats);
    return (
        <div className="px-10">
            <h1 className="my-8 text-3xl">Welcome Back Admin {user?.displayName}</h1>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaWallet size={25}></FaWallet>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">{stats.revenue}$</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers size={25}></FaUsers>
                    </div>
                    <div className="stat-title">Customers</div>
                    <div className="stat-value">{stats.customers}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUtensils size={25}></FaUtensils>
                    </div>
                    <div className="stat-title">Products</div>
                    <div className="stat-value">{stats.products}</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaTruck size={25}></FaTruck>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;