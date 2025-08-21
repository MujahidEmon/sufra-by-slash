import { useContext } from "react";
import { GiConfirmed } from "react-icons/gi";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const Checkout = () => {
    const { cartProducts, totalPrice, grandTotal, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cart] = useCart();
    const totalCartPrice = cart.reduce((sum, item) => sum += item.price,0)
    console.log(totalCartPrice);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (cartProducts.length < 1) {
            toast.error("No Items in Cart");
            navigate("/");
            return;
        }

        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const phone = form.get("phone");
        const email = form.get("email");
        const address = form.get("address");
        const note = form.get("note");

        const newOrder = {
            name,
            email,
            phone,
            address,
            note,
            grandTotal,
            totalPrice,
            cartProducts,
            status: "Pending",
        };

        try {
            // Place the order
            const orderRes = await fetch("https://elara-international-server.onrender.com/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newOrder),
            });

            // Check if order placement succeeded
            if (!orderRes.ok) {
                const errorData = await orderRes.json();
                throw new Error(errorData.message || "Failed to place order");
            }

            // === Clear cart conditionally ===
            if (user?.email) {
                // If user is logged in, clear cart from database
                const clearRes = await fetch(`https://elara-international-server.onrender.com/cartProducts/clear/${encodeURIComponent(user.email)}`, {
                    method: "DELETE",
                });

                const clearData = await clearRes.json();

                if (!clearRes.ok || !clearData.success) {
                    toast.error("Order placed but cart not cleared from database.");
                }
            } else {
                // Not logged in, just clear localStorage
                localStorage.removeItem("cartProducts");
            }

            // Show success message
            Swal.fire({
                title: "Order Placed Successfully",
                icon: "success",
            });

            // Redirect or reload
            // navigate("/orders"); // Optional
            // window.location.reload(); // Optional

        } catch (error) {
            console.error("Error placing order:", error);
            toast.error(error.message || "Something went wrong while placing your order.");
        }
    };




    return (
        <div>
            <section
                className="relative bg-no-repeat bg-cover font-raleway  antialiased min-h-screen"
                style={{
                    backgroundImage:
                        "url('https://i.ibb.co/gb1hw2fK/vecteezy-composition-of-black-friday-shopping-cart-with-gift-boxes-or-31351608.jpg')",
                }}
            >
                {/* Dark overlay on background image */}
                <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

                <form
                    onSubmit={handlePlaceOrder}
                    className="relative z-10 mx-auto max-w-screen-xl px-6 sm:px-10"
                >
                    <div className="rounded-2xl bg-black bg-opacity-70 backdrop-blur-md shadow-lg p-8 sm:p-12">
                        <h1 className="text-center text-white text-4xl font-bold mb-8">
                            Checkout
                        </h1>

                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Left side - Delivery details */}
                            <div className="flex-1 space-y-8 text-gray-200">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-semibold mb-6">Delivery Details</h2>
                                        <h2 className="text-2xl font-semibold mb-6">Total Amount: ${totalCartPrice}</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="your_name"
                                                className="block mb-2 text-sm font-medium"
                                            >
                                                Your Name*
                                            </label>
                                            <input
                                                type="text"
                                                id="your_name"
                                                name="name"
                                                placeholder="Enter Your Name"
                                                required
                                                className="w-full rounded-lg border border-gray-700 bg-gray-900 bg-opacity-80 px-4 py-2 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="your_email"
                                                className="block mb-2 text-sm font-medium"
                                            >
                                                Your Email
                                            </label>
                                            <input
                                                type="email"
                                                id="your_email"
                                                name="email"
                                                placeholder="Enter Your Email Address"

                                                className="w-full rounded-lg border border-gray-700 bg-gray-900 bg-opacity-80 px-4 py-2 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="phone-input"
                                                className="block mb-2 text-sm font-medium"
                                            >
                                                Phone Number*
                                            </label>
                                            <input
                                                type="text"
                                                id="phone-input"
                                                name="phone"
                                                pattern="[0-9]{11}"
                                                placeholder="01700000000"
                                                required
                                                className="w-full rounded-lg border border-gray-700 bg-gray-900 bg-opacity-80 px-4 py-2 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="full_address"
                                                className="block mb-2 text-sm font-medium"
                                            >
                                                Full Address*
                                            </label>
                                            <input
                                                type="text"
                                                id="full_address"
                                                name="address"
                                                placeholder="Vill: , Upozilla: , Zilla:"
                                                required
                                                className="w-full rounded-lg border border-gray-700 bg-gray-900 bg-opacity-80 px-4 py-2 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="note"
                                                className="block mb-2 text-sm font-medium"
                                            >
                                                Any Note?
                                            </label>
                                            <input
                                                type="text"
                                                id="note"
                                                name="note"
                                                placeholder="Leave a note"
                                                className="w-full rounded-lg border border-gray-700 bg-gray-900 bg-opacity-80 px-4 py-2 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <button
                                                type="submit"
                                                className="w-full flex items-center justify-center gap-3 rounded-lg bg-[#FCAB35] px-6 py-3 text-white text-lg font-semibold hover:bg-[#fcac35dd] focus:outline-none focus:ring-4  transition"
                                            >
                                                <GiConfirmed size={22} />
                                                Place Order
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment section */}
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4 text-gray-200">
                                        Payment
                                    </h3>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                                            <input
                                                type="radio"
                                                name="payment-method"
                                                value="pay-on-delivery"
                                                className="h-5 w-5 text-indigo-600 border-gray-700 focus:ring-indigo-500"
                                                defaultChecked
                                            />
                                            <span>Payment on delivery</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Order summary */}
                            {/* <div className="w-full max-w-md rounded-2xl p-8 shadow-lg bg-black bg-opacity-70 text-gray-200">
                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                <ul className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                  {cartProducts.map((product) => (
                    <CartCard product={product} key={product.id} />
                  ))}
                </ul>

                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>BDT {totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>BDT 110</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-700 pt-5 text-gray-100">
                  <div className="flex justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span>BDT {grandTotal}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Shipping costs are calculated during checkout.
                  </p>
                </div>
              </div> */}
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Checkout;
