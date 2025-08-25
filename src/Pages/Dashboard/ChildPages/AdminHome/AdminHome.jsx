import useAuth from "../../../../Hooks/useAuth";

const AdminHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h1>Welcome Back Admin {user?.displayName}</h1>
        </div>
    );
};

export default AdminHome;