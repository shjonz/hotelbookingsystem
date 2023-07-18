import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router()

router.get("/config", (req, res) => {
    console.log(' inside /config in server ');
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
    console.log(process.env.STRIPE_PUBLISHABLE_KEY);
  });

router.post("/create-payment-intent", async (req, res) => {
    console.log('inside create payment intent');
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "EUR",
        amount: 1999,
        automatic_payment_methods: { enabled: true },
      });
  
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });

export default router;