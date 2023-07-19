import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BookingSchema = new Schema({
    destID: {type: String, required: true},
    hotelID: {type: String, required: true},
<<<<<<< Updated upstream
    price: {type: String, required: true},
    bookingInfo: {type: Object, required: true}
=======
    price: {type: Number, required: true},
    bookingInfo: {type: Object, required: true}, //json file 
>>>>>>> Stashed changes
})

const Booking = model("Bookings", BookingSchema);
export default Booking;