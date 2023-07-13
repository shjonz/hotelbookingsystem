import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DestinationSchema = new Schema({
    uid: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    type: {type: String, required: true},
    state: {type: String, required: false},
    name: {type: String, required: true},
})

const Destination = model("Destinations", DestinationSchema);
export default Destination;