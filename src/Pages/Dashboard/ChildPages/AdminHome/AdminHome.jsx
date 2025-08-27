import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaTruck, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';


const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    const { data: stats = [] } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('admin-stats')
            return res.data
        }
    })

    const { data: orderStats = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('order-stats')
            return res.data;
        }
    })
    console.log(orderStats);

    console.log(stats);


    // custom shape for bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };



    // Pie Chart
    
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const RADIAN = Math.PI / 180;
        const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${((percent ?? 1) * 100).toFixed(0)}%`}
            </text>
        );
    };

    const PieChartData = orderStats.map(order => {
        return {name: order.category, revenue: order.revenue}
    })

    return (
        <div className="px-10">
            <h1 className="my-8 text-3xl">Welcome Back Admin {user?.displayName}</h1>

            {/* Stats */}
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

            {/* Charts */}
            <div className="my-18 bg-white py-12  flex md:flex-row flex-col items-center rounded-2xl shadow-2xl">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={orderStats}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {orderStats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                <div className="w-1/2">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={PieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="revenue"   
                        >
                            {PieChartData.map((entry, index) => (
                                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;