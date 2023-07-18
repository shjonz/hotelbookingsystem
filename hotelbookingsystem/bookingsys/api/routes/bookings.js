import express from "express";
import Bookings from "../models/Bookings.js";

const router = express.Router();

// Creates a booking with the required params. NOT COMPLETE YET.
router.post('/create', createBooking, (req,res)=>{
    res.send(createBooking)
})

// Get a user's booking data by giving their unique ID provided by Mongo.
router.get("/account/id", getBookingList, (req,res)=>{
    res.send(getBookingList)
})

// Function Space

async function getBookingList(req, res, next) {
    let bookingList;
    try {
        bookingList = await Bookings.findById(req.query.id)
    } catch (e) {res.send(e);}

    res.getBookingList = bookingList;
    next()
}

async function createBooking(req, res, next) {
    const newBooking = new Bookings({
        destID: req.body.destID,
        hotelID: req.body.hotelID,
        price: req.body.price,
        bookingInfo: req.body.bookingInfo
    })
    let createBooking;

    try{
        createBooking = await newBooking.save()
    }catch(err){
        res.status(400).json({message:err.message})
    }

    res.createBooking = createBooking;
    next()
}


export default router;