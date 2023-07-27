import express from "express";
import Bookings from "../models/Bookings.js";
import Accounts from "../models/Accounts.js";

const router = express.Router();

// Gets all bookings in the entire database. This is not sorted by user because there are no SQL links.
router.get("/", getAllBookings, (req, res) => {
    res.status(200).send(res.getAllBookings)
})

// Get a single booking using the unique ID of the booking provided by Mongo.
router.get("/one", getBooking, (req, res) => {
    res.status(200).send(res.getBooking)
})

// Get a user's booking data by giving their unique ID provided by Mongo.
router.get("/id", getBookingList, (req, res) => {
    res.status(200).send(res.getBookingList)
})

// Deletes one booking based on the unique ID provided by Mongo.
router.delete("/one", deleteBooking, (req, res) => {
    res.status(200).send("Booking successfully deleted.")
  })

// Creates a booking with the required params. All the random shit goes into bookingInfo which is basically just another json file since it's kinda optional. Is this lazy? Yes. Do I care? No.
// Note for those who are creating, the template is like this:
// destID : String
// hotelID : String
// price: Number
// bookingInfo : JSON file with all of the extra details. I might recommend hashing it somehow in case of any personal info but idk.
router.post('/create', createBooking, (req, res) => {
    res.status(200).send(res.createBooking)
})

// Function Space

async function getAllBookings(req, res, next) {
    try {
        const getAllBookings = await Bookings.find({});
        res.getAllBookings = getAllBookings;
      } catch (e) {res.send(e);}
      next();
}

async function getBooking(req, res, next) {
    try {
        const getBooking = await Bookings.findById(req.query.uid);
        res.getBooking = getBooking;
        //res.json(getBooking)
    } catch (e) {res.send(e);}
    next();
}

async function getBookingList(req, res, next) {
    try {
        const getBookingList = await Accounts.findById(req.query.uid)
        res.getBookingList = getBookingList.bookingHistory
        //res.json(getBookingList.bookingHistory)
    } catch (e) {res.send(e);}
    next();
}

async function deleteBooking(req, res, next) {
    try {
      const bookingValidity = await Bookings.findById(req.query.uid)
      if (bookingValidity != null) {
        await Bookings.findByIdAndDelete(`${req.query.uid}`)
      } else {
        return res.status(404).send("Error 404: Booking not found")
      }
    } catch (e) {res.send(e);}
    next();
  }

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

export default router;