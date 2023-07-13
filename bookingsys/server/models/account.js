import mongoose from "mongoose";
const { Schema, model } = mongoose;

const accountSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    bookings: {type: [String], required: true, default: []},
})

const account = model("accounts", accountSchema);
export default account;