const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema=new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    secondName: {
        type:String,
        required:false
    },
    emailId:{
        type:String,
        required:true
        
    },
    password: {
        type:String,
        required:false
    },
    Phone:{
        type:String,
        required:false
    },
    userName:{
        type:String,
        required:true
    },
    registeredDate: {
        type:Date,
        required:true,
        default:Date.now
    },
    hotelpointer:{
        type:String,
        required:true,
        maxlength:1,
        default:"0"
    }
})

UserSchema.pre('save',async function (next) {
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


module.exports = mongoose.model('users',UserSchema);