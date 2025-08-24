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
import AllUsers from "../Pages/Dashboard/ChildPages/AllUsers/AllUsers";
import AdminRoutes from "./AdminRoutes";
import AddItem from "../Pages/Dashboard/ChildPages/AddItem/AddItem";
import ManageItems from "../Pages/Dashboard/ChildPages/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/ChildPages/ManageItems/UpdateItemPage/UpdateItem";
import Checkout from "../Pages/CheckoutPage/Checkout";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/ChildPages/PaymentHistory/PaymentHistory";

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
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: 'cart',
                element:<MyCart></MyCart>
            },
            {
                path: 'allUsers',
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path: 'addItems',
                element: <AdminRoutes><AddItem></AddItem></AdminRoutes>
            },
            {
                path: 'manageItems',
                element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
            },
            {
                path: 'checkout',
                element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
            },
            {
                path: 'paymentHistory',
                element: <PrivateRoutes><PaymentHistory></PaymentHistory></PrivateRoutes>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
        ]
    }
])

export default router;