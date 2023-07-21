import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BookingSchema = new Schema({
    destID: {type: String, required: true},
    hotelID: {type: String, required: true},
    price: {type: String, required: true},
    bookingInfo: {type: Object, required: true}
})

const Booking = model("Bookings", BookingSchema);
export default Booking;