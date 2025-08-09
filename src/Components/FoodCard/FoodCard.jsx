import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const FoodCard = ({ item }) => {
    const { user } = useAuth();
    const { name, recipe, image, price, _id } = item;
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleAddToCart = item => {
        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                name, 
                recipe,
                image,
                price,
                email: user.email
            }
            axiosSecure.post ('/cart', cartItem)
            .then(res => {
                console.log(res.data);
                res.data.insertedId && toast.success(`${name} added to cart`)
            })
            return;
        }
        Swal.fire({
            title: "Login Required",
            text: "Please login to add to cart",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login Now"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login', {state: location.pathname})
            }
        });
    }
    return (
        <div className="card rounded-none bg-base-300 w-88 shadow-sm">
            <figure>
                <img
                    className="object-cover"
                    src={image}
                    alt={name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{name}

                    <div className="badge badge-warning font-semibold">${price}</div>
                </h2>
                <p className="text-center">{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-0 border-b-2">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;