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

import searchRoute from "./routes/search.js"

app.use("/search", searchRoute);

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

// Functions begin here



// Don't touch anything below this
const port = process.env.PORT;

app.listen({port},() => {
  console.log(`Server running at http://localhost:${port}`)
})
