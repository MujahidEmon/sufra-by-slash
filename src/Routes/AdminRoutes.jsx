import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoutes = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const { user, loading } = useAuth();
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading</div>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={'/login'} state={location.pathname} replace ></Navigate>
};

export default AdminRoutes;