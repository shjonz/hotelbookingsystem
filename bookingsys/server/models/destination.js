import mongoose from "mongoose";
const { Schema, model } = mongoose;

const destinationSchema = new Schema({
    uid: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    type: {type: String, required: true},
    state: {type: String, required: false},
    name: {type: String, required: true},
})

const destination = model("destinations", destinationSchema);
export default destination;