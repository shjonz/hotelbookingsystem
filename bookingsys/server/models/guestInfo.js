import mongoose from "mongoose";

const { Schema, model } = mongoose;

const guestInfoSchema = new Schema({
  FirstName: { type: String, required: true },
  SecondName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  billingAddress: { type: String, required: true },
  specialRequest: { type: String, required: false }, // Marked as optional
});


const guestInfo = model("GuestInfo",guestInfoSchema);
export default guestInfo;
