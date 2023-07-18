import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import searchRoute from "./routes/search.js";
import accountsRoute from "./routes/accounts.js";
import bookingRoute from "./routes/bookings.js";
import fetch from "node-fetch";
import fs from "fs";
import { loadStripe } from "@stripe/stripe-js";
import stripePackage from "stripe";
import Stripe from "stripe";
import {resolve } from "path";

//import { Stripe } from "@stripe/stripe-js";
//import data from "./destinations.json";

import {Client} from "@googlemaps/google-maps-services-js";
import {MongoClient} from "mongodb";

const app = express()
//const env = dotenv.config({ path: "./.env"});
dotenv.config()


//Jia kangs code
//const fetch = require('node-fetch') 
//const googleMapsClient = require('@google/maps').createClient({
  //  key: "Google API Key",
    //Promise: Promise
  //})
const googleMapsClient = new Client({});

mongoose.connect(process.env.MONGO);
const db = mongoose.connection;
db.on( 'error', (error) => console.error(error) );
db.once('open', (error) => console.log(" connected to db "));



//const port = 8383
//const fs = require('fs')

//srees code
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("mongoose initialized.")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!");
});


//const stripe = await loadStripe();
//console.log(stripe);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});
//console.log(stripe);

// const customer = await stripe.customers.create({
//   email: 'customer@example.com',
// });

// console.log(customer.id);
//const stripe = new Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
//const customer = await stripe.customers.create({
  //email: 'customer@example.com',
//});
//const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

//middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use("/api/auth",authRoute);
//app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/search", searchRoute);
app.use("/api/accounts", accountsRoute);
app.use("/api/bookings", bookingRoute);

app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500
  const errorMessage=err.message || "Something went wrong!"
  return res.status(500).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  })
});

// app.listen(8800,() => {
//     connect();
//     console.log("Connected to backend.")
// })

//app.use(express.static(process.env.STATIC_DIR));

//app.get("/", (req, res) => {
//  const path = resolve(process.env.STATIC_DIR + "./index.html");
//  res.sendFile(path);
//});

app.get("/config", (req, res) => {
  console.log(' inside /config in server ');
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
  console.log(process.env.STRIPE_PUBLISHABLE_KEY);
});


app.post("/create-payment-intent", async (req, res) => {
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



//JIA KANG APIS CALL 
//const fetch = require('node-fetch') 
//const googleMapsClient = require('@google/maps').createClient({
  //  key: "Google API Key",
    //Promise: Promise
  //})
  //const fs = require('fs')

// All destinations (i.e. countries and cities) to showcase to user in dropdown box to type and match
// app.get('/', async (req, res) => {
//   const data = fs.readFileSync('destinations.json', 'utf8');
//   const destinations = JSON.parse(data);
//   const terms = destinations.map(destination => destination.term);
//   const uniqueTerms = [...new Set(terms)];
//   uniqueTerms.sort();
//   res.send(uniqueTerms);
// })

// 1. Search for destination in destination.json, return uid 
// 2. Call price and hotel APIs to get info on a list of hotels 
// E.g. http://localhost:8383/Singapore-Singapore/2023-10-01/2023-10-07/en_US/SGD/2/1
app.get('/:location/:checkin/:checkout/:lang/:currency/:guests/:partner_id', async (req, res) => {
  let location = req.params.location;
  location = location.replace(/-|_/g, ', ');
  const checkin = req.params.checkin; // YYYY-MM-DD format
  const checkout = req.params.checkout; // YYYY-MM-DD format
  const lang = req.params.lang; // E.g. “en_US”
  const currency = req.params.currency; // ISO code for currencies (E.g SGD)
  const guests = req.params.guests; // Number of guests staying per room - /* TODO: Seperator for more than one room
  const partner_id = req.params.partner_id; // 1 for now, for loyalty points

  // Get UID from destinations.json
  const data = fs.readFileSync('./destinations.json', 'utf8');
  const destinations = JSON.parse(data);
  const destination = destinations.find(dest => dest.term === location);
  if (!destination) {
      res.status(404).send('No destination found for the specified location.');
      return;
  }
  // Fetch info about hotels from hotel list API
  const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destination.uid}`);
  if (!response.ok) {
      console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
      res.status(500).send('An error occurred while processing your request.');
      return;
  }
  const hotelData = await response.json();
  //console.log("okay");

  let country_code;
      if (hotelData.length > 0) {
          country_code = hotelData[0].original_metadata.country;
      } else {
          console.error('No hotels found for the specified destination.');
          res.status(404).send('No hotels found for the specified destination.');
          return;
      }
  const hotels = hotelData.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      image: hotel.image_details ? hotel.image_details.prefix + hotel.image_details.suffix : null,
      rating: hotel.rating,
      country: hotel.original_metadata.country,
  }));
  //console.log(hotelData.length);
// console.log(hotelData[0].original_metadata);
// console.log(hotelData[0].original_metadata.country);
// console.log(country_code);

  // Fetch prices from second prices API
  const response2 = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&country_code=${country_code}&guests=${guests}&partner_id=1`);
  if (!response2.ok) {
      console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
      res.status(500).send('An error occurred while processing your request.');
      return;
  }
  const hotelprices = await response2.json();
  if (hotelprices.hotels.length === 0) {
      res.status(404).send('No hotels found for the specified search criteria.');
      return;
  }
  const extractedHotelprices = hotelprices.hotels.map(hotel => ({
      id: hotel.id,
      searchRank: hotel.searchRank,
      price: hotel.price,
      market_rates: hotel.market_rates,
  }));
  console.log("okay");


  // Combine the data from the two APIs
  const combinedData = hotels.map(hotel => {
      const priceData = extractedHotelprices.find(price => price.id === hotel.id);
      return {
          ...hotel,
          ...priceData
      };
  });
  // Send data containing hotels - So far only tested for Singapore 
  res.send(combinedData);
  console.log(combinedData);

});




//TODO: HOTEL PAGE API 
app.get('/:hotel', async (req, res) => {
  const hotelid = req.params.hotel;
  const response3 = await fetch("https://hotelapi.loyalty.dev/api/hotels/${hotelid}");
  const hotelData = await response3.json();

  res.send(hotelData);
})
//TODO: CREATE BOOKING API

const port = process.env.PORT;
app.listen( {port} , () => {
  connect();
  console.log(`Server running at http://localhost:${port}`);
});



// mongoose.connection.on("connected",()=>{
//     console.log("mongoDB connected!")
// })

// app.get("/users", (req,res)=>{
//     res.send("hello first request")

// }) need to put this in another file
