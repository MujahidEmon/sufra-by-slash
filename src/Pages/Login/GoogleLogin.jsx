import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { googleSignIn, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();

    const from = location.state || '/'
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                const loggedUser = {
                    email: res.user.email,
                    name: res.user.displayName
                }

                updateUserProfile(res.user.displayName, res.user.photoURL)
                axiosPublic.post('/users', loggedUser)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            toast.success(`Thanks , your info is added to DB`);
                        }
                    })
                
                navigate(from, {replace: true});
                console.log('logged user ', res);

            })
    }
    return (
        <button
            onClick={handleGoogleLogin}
            className="btn btn-circle"
        >
            <FaGoogle size={30}></FaGoogle>
        </button>
    );
};

export default GoogleLogin;