import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";



function Payment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect( () => {
        fetch("api/stripe/config").then(async (r) => {
            const {publishableKey} = await r.json();
            //console.log(' payment component /config ', publishableKey);
            setStripePromise(loadStripe(publishableKey));
        });
    }, [] )

    useEffect( () => {
        console.log(' inside payment component use effect ');
        fetch("api/stripe/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        }).then(async (r) => {
            const {clientSecret} = await r.json();
            //console.log(' inside payment component ', clientSecret);
            setClientSecret(clientSecret);
        });
    }, [] );

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