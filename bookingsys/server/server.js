import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const app = express();

// Initialize Mongoose
mongoose.connect(process.env.MONGO);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', (error) => console.log("Connected to Database"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

import searchRoute from "./routes/search.js";
import hotelsRoute from "./routes/hotels.js";
import authRoute from "./routes/auth.js";
import accountsRoute from "./routes/accounts.js";
import bookingRoute from "./routes/bookings.js";

app.use("/search", searchRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/auth",authRoute);
app.use("/api/accounts",accountsRoute);
app.use("/api/bookings",bookingRoute);

app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errorMessage=err.message || "Something went wrong!"
    return res.status(500).json({
      success:false,
      status:errorStatus,
      message:errorMessage,
      stack:err.stack,
    })
})

// Functions Space

// Don't touch anything below this
const port = process.env.PORT;

export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen({port},() => {
    console.log(`Server running at http://localhost:${port}`)
  })
}