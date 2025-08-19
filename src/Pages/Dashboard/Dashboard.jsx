import { FaBook, FaHamburger, FaHome, FaShoppingCart, FaUser, FaUsers, FaUtensilSpoon } from "react-icons/fa";
import { FaAd,  FaCalendar, FaEnvelope,  FaList, FaSearch, FaUtensils } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useCart from "../../Hooks/useCart";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [cart] = useCart();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-base-300">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">

                </label>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <h1 className="font-bold py-6 w-full  text-center bg-gradient-to-r from-gray-300 to-cyan-200 text-3xl mx-auto "><span className="text-blue-950">SUFRA</span> by S<span className="text-red-600">L</span>ASH</h1>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    {/* <li><Link><FaUser></FaUser> Admin Home</Link></li>
                    <li><Link><FaUtensilSpoon></FaUtensilSpoon> Add Item</Link></li>
                    <li><Link><FaHamburger></FaHamburger> Manage Items</Link></li>
                    <li><Link><FaBook></FaBook>Manage Bookings</Link></li>
                    <li><Link to={'/dashboard/allUsers'}><FaUsers></FaUsers> All Users</Link></li>
                    <li><Link to={'/dashboard/cart'}><FaShoppingCart></FaShoppingCart> My Cart</Link></li>
                    <div className="divider"></div>
                    <li><Link to={'/'}><FaHome></FaHome>Home</Link></li>
                    <li><Link to={'/menu'}><TiThMenu></TiThMenu>Menu</Link></li> */}
                    {/* <li><Link to={'/order/salad'}>Order Food</Link></li> */}
                    {/* <li><Link to={'/cart'}>Cart <p className="badge badge-accent">{cart.length}</p></Link></li> */}
                    {/* <li><Link to={'/dashboard'}>Dashboard</Link></li> */}
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems">
                                    <FaList></FaList>
                                    Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaBook></FaBook>
                                    Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendar></FaCalendar>
                                        Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaList></FaList>
                                        My Bookings</NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;