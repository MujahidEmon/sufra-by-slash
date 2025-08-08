import { Navigate, replace, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation()

    if(loading){
        return <div className="min-h-screen flex items-center justify-center">Loading</div>
    }
    if(user){
        return children;
    }
    return <Navigate to={'/login'} state={location.pathname} replace ></Navigate>
};

export default PrivateRoutes;