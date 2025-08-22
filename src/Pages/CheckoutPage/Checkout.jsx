import { useContext, useState } from "react";
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
    const [paymentMethod, setPaymentMethod] = useState('card')
    const totalCartPrice = cart.reduce((sum, item) => sum += item.price, 0)
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


                                    </div>
                                </div>

                                {/* Payment section */}
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4 text-gray-200">
                                        Payment
                                    </h3>
                                    <div className="flex justify-between gap-6">
                                        <div className="flex items-center">
                                            <input type="radio" className="w-5 h-5 cursor-pointer" id="card" name="card"
                                                value="card"
                                                checked={paymentMethod === "card"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                                <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                                                <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                                                <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                                            </label>
                                        </div>
                                        <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                                            <input
                                                type="radio"
                                                name="payment-method"
                                                value="cod"
                                                checked={paymentMethod === "cod"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="h-5 w-5 text-indigo-600 border-gray-700 focus:ring-indigo-500"

                                            />
                                            <span>Payment on delivery</span>
                                        </label>
                                    </div>
                                    {
                                        paymentMethod === 'card' &&
                                        <div className="grid gap-4 mt-4">
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Cardholder's Name"
                                                    className="px-4 py-3.5 border-gray-700 bg-gray-900 text-white w-full text-sm border  rounded-md focus:border-purple-500 focus:bg-black outline-0"
                                                />
                                            </div>
                                            <div className="flex border-gray-700 bg-gray-900 border  rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-3" viewBox="0 0 32 20">
                                                    <circle cx="10" cy="10" r="10" fill="#f93232" />
                                                    <path
                                                        fill="#fed049"
                                                        d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                                                    />
                                                </svg>
                                                <input
                                                    type="number"
                                                    placeholder="Card Number"
                                                    className="px-4 py-3.5 text-white w-full text-sm outline-0 bg-transparent"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <input
                                                        type="number"
                                                        placeholder="EXP."
                                                        className="px-4 py-3.5 border-gray-700 bg-gray-900 text-white w-full text-sm border  rounded-md focus:border-purple-500 focus:bg-transparent outline-0"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="number"
                                                        placeholder="CVV"
                                                        className="px-4 py-3.5 border-gray-700 bg-gray-900 text-white w-full text-sm border  rounded-md focus:border-purple-500 focus:bg-transparent outline-0"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div className="sm:col-span-2 mt-4">
                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center gap-3 rounded-lg bg-[#FCAB35] px-6 py-3 text-white text-lg font-semibold hover:bg-[#fcac35dd] focus:outline-none focus:ring-4  transition"
                                        >
                                            <GiConfirmed size={22} />
                                            {paymentMethod === 'card' ?' Pay Now ': 'Place Order'}
                                        </button>
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
