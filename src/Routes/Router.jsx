import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Root from "../Pages/Root";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu/Menu";
import OrderFood from "../Pages/OrderFood/OrderFood";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
// import MyCart from "../Pages/MyCart/MyCart";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyCart from "../Pages/Dashboard/ChildPages/MyCart/MyCart";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path: 'menu',
                element: <Menu></Menu>
            },
            {
                path: 'order/:category',
                element: <OrderFood></OrderFood>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: '/dashboard/cart',
                element: <MyCart></MyCart>
            }
        ]
    }
])

export default router;