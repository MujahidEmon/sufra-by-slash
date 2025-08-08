import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        // .catch(error => console.error(error))
        toast.success('Logout Successful')
    }









    const navList = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/menu'}>Menu</Link></li>
        <li><Link to={'/order/salads'}>Order Food</Link></li>
        <li><Link to={'/cart'}>Cart</Link></li>
    </>


    return (
        <div className="navbar fixed z-10 text-white  bg-black/30 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content font-semibold bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navList}
                    </ul>
                </div>
                <Link className="" to={'/'}>Sufra By SLASH</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navList}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? <button onClick={handleLogout} className="btn">Logout</button> : <Link to={'/login'} className="btn">Login</Link>}
            </div>
        </div>
    );
};

export default Navbar;