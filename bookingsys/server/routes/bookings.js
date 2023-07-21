import express from "express";
import Bookings from "../models/Bookings.js";
import Accounts from "../models/Accounts.js";

const router = express.Router();

// Creates a booking with the required params. All the random shit goes into bookingInfo which is basically just another json file since it's kinda optional. Is this lazy? Yes. Do I care? No.
router.post('/create', createBooking, (req, res) => {
    res.status(200).send(res.createBooking)
})

router.get("/", getBooking, (req, res) => {
    res.status(200).send(res.getBooking)
    console.log("get bookings");
})

// Get a user's booking data by giving their unique ID provided by Mongo.
router.get("/id", getBookingList, (req, res) => {
    res.status(200).send(res.getBookingList)
})

// Function Space

async function createBooking(req, res, next) {
    try{
        const newBooking = new Bookings({
            destID: req.body.destID,
            hotelID: req.body.hotelID,
            price: req.body.price,
            bookingInfo: req.body.bookingInfo
        })
        const createBooking = await newBooking.save()
        res.createBooking = createBooking;
    }catch(err){
        res.status(400).json({message:err.message})
    }
    next();
}

async function getBooking(req, res, next) {
    try {
        const getBooking = await Bookings.findById(req.query.uid)
        res.getBooking = getBooking;
    } catch (e) {res.send(e);}
    next();
}

async function getBookingList(req, res, next) {
    try {
        const getBookingList = await Accounts.findById(req.query.uid)
        res.getBookingList = getBookingList.bookingHistory
    } catch (e) {res.send(e);}
    next();
}


export default router;