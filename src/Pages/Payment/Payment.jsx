import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "../CheckoutPage/Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)


const Payment = () => {
    return (
        <Elements stripe={stripePromise} >
            <Checkout></Checkout>
        </Elements>
    );
};

export default Payment;