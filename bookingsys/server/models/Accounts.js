import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const AccountSchema=new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    bookingHistory: {type: [String], required: true, default: undefined},
})

AccountSchema.pre('save',async function (next) {
    try {
        // Generate a salt
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
    
        // Hash password with the generated salt
        const HashedPassword = await bcrypt.hash(this.password, salt)
    
        // replace the plain text password with hashed password
        this.password = HashedPassword
        next();
    } catch (err) {
        next(err);}
    })
    

const Account = model("Accounts", AccountSchema);
export default Account;