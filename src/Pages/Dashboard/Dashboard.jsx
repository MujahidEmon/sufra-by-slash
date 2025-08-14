import { FaBook, FaHamburger, FaHome, FaShoppingCart, FaUser, FaUsers, FaUtensilSpoon } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
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
                <h1 className="font-semibold text-2xl mx-auto " style={{
                    fontFamily: "cursive"
                }}>SUFRA by SLASH</h1>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><Link><FaUser></FaUser> Admin Home</Link></li>
                    <li><Link><FaUtensilSpoon></FaUtensilSpoon> Add Item</Link></li>
                    <li><Link><FaHamburger></FaHamburger> Manage Items</Link></li>
                    <li><Link><FaBook></FaBook>Manage Bookings</Link></li>
                    <li><Link to={'/dashboard/allUsers'}><FaUsers></FaUsers> All Users</Link></li>
                    <li><Link to={'/dashboard/cart'}><FaShoppingCart></FaShoppingCart> My Cart</Link></li>
                    <div className="divider"></div>
                    <li><Link to={'/'}><FaHome></FaHome>Home</Link></li>
                    <li><Link to={'/menu'}><TiThMenu></TiThMenu>Menu</Link></li>
                    {/* <li><Link to={'/order/salad'}>Order Food</Link></li> */}
                    {/* <li><Link to={'/cart'}>Cart <p className="badge badge-accent">{cart.length}</p></Link></li> */}
                    {/* <li><Link to={'/dashboard'}>Dashboard</Link></li> */}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;