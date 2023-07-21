import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../checkout/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect( () => {
        fetch("/config").then(async (r) => {
            const {publishableKey} = await r.json();
            setStripePromise(loadStripe(publishableKey));
        });
    }, [] )

    useEffect( () => {
        fetch("/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        }).then(async (r) => {
            const {clientSecret} = await r.json();
            setClientSecret(clientSecret)
        });
    }, [] )

    return (
        <>
        <h1>React Stripe and payment Element</h1>
        {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={ { clientSecret } }>
                <CheckoutForm />
            </Elements>
        )}
        
        </>
    );
}

export default Payment;