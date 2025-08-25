import useAuth from "../../../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h1>Welcome Back User {user?.displayName ? user?.displayName : 'Chief'}</h1>
        </div>
    );
};

export default UserHome;