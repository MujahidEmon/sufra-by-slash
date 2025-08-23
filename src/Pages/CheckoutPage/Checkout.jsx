import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import toast from "react-hot-toast";
import useCart from "../../Hooks/useCart";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";


const Checkout = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart()
    const { user } = useAuth();
    const totalPrice = cart.reduce((sum, item) => sum += item.price, 0)
    useEffect(() => {
    if (totalPrice > 0) {
            const fetchClientSecret = async () => {
                const res = await axiosSecure.post('/create-payment-intent', { price: totalPrice })
                console.log(res.data);
                setClientSecret(res.data.clientSecret)
                return res.data
            }
            fetchClientSecret();
        }
    }, [axiosSecure, totalPrice])
    console.log(clientSecret);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('error ', error);
            toast.error(error.message)
        }
        else {
            console.log('paymentMethod', paymentMethod);
        }

        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                }
            }
        })

        if (paymentError) {
            console.log('confirm error: ', paymentError);
        }
        else {
            console.log('trId: ', paymentIntent.id);
            const paymentInfo = {
                email: user?.email,
                name: user?.displayName,
                cartIds: cart.map(c => c._id),
                menuIds: cart.map(c => c.MenuId),
                date: new Date(),
                price: totalPrice,
                transactionId: paymentMethod.id
            }

            const paymentRes = await axiosSecure.post('/payments', paymentInfo);
            console.log(paymentRes.data);
        }
    }
    return (
        <div>
            <div className="-mt-12">
                <SectionHeading heading={'Payment'} subheading={'Please Pay to Eat'}></SectionHeading>
            </div>
            <h1>{totalPrice}</h1>
            <form onSubmit={handleSubmit} >
                <CardElement
                    options={{
                        style: {


                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default Checkout;