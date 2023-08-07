import express from "express";
import Accounts from "../models/Accounts.js";
import mongoose from "mongoose";

const router = express.Router();

// Get all accounts stored in the database and send them back without any filtering.
router.get("/", getAllAccounts, (req, res) => {
  res.status(200).send(res.getAllAccounts)
})

// Gets one account using the email of the user. Does not return multiple and only returns the most popular, so if there is somehow duplicate (which there shouldn't be cos I changed the create below, then it'll only return the "most popular" one.)
router.get("/one", getAccount, (req, res) => {
  res.status(200).send(res.getAccount)
})

// Deletes one account using the unique ID of the user. This is to ensure that you get the exact account that you want to delete, to again, prevent duplicates (which should never happen), from getting in the way of the delete. So make you get the _id of the thing from above!
router.delete("/one", deleteAccount, (req, res) => {
  res.status(200).send("Account successfully deleted.")
})

// Creates one account given specific parameters. The currently required params in the body will be:
// name : a string name
// email : a string email
// password : a string password
// bookingHistory : set this as [] for default
router.post("/one", createAccount, (req, res) => {
  res.status(201).send(res.newAccount)
})

// Updates an account with everything you put into the body. This works for emails passwords and name because why the heck should it not. Do note that this is specifically meant for bookingHistory, in which you put the _id (UID) of the booking made as an array. For example... 
// bookingHistory : ["64b7b57c7ce93fc68ac620c3"] ** Note that this doesn't check for valid bookings, not that it should be used without confirming a booking's UID.
router.patch("/one", updateAccount, (req, res) => {
  res.status(200).send(res.updateAccount)
})

router.patch("/", updateBookingList, (req, res) => {
  res.status(200).send("Account's bookings successfully updated.")
})

// New route to delete a booking entry from user's bookingHistory
router.patch("/del", deleteBookingEntry, (req, res) => {
  res.status(200).send("Booking entry successfully deleted from user's bookingHistory.");
});
// Function Space



async function getAllAccounts(req, res, next) {
  try {
    const getAllAccounts = await Accounts.find({});
    res.getAllAccounts = getAllAccounts;
  } catch (e) {res.send(e);}
  next();
}

async function getAccount(req, res, next) {
  try {
    const getAccount = await Accounts.findOne({email: req.query.email})
    if (getAccount == null) {
      return res.status(404).send("Error 404: Account not Found");
    }
    res.getAccount = getAccount;
  } catch (e) {res.send(e);}
  next();
}

async function deleteAccount(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.query.uid)) {
    return res.status(404).send("Error 404: Account not found");
}
    const accountValidity = await Accounts.findById(req.query.uid)
    if (accountValidity != null) {
      await Accounts.findByIdAndDelete(`${req.query.uid}`)
    } else {
      return res.status(404).send("Error 404: Account not found")
    }
  next();
}

async function createAccount(req, res, next) {
  try {
    const accountValidity = await Accounts.findOne({email: req.body.email})
    if (accountValidity == null) {
      const newAccount = new Accounts({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        bookingHistory: req.body.bookingHistory,
      })
      const success = await newAccount.save()
      res.newAccount = newAccount
    } else {
      return res.status(409).send("Error 409: Email already Registered")
    }
  } catch (e) {res.send(e);}
  next();
}

async function updateAccount(req, res, next) {
  try {
    //const accountValidity = await Accounts.findOneAndUpdate({_id: req.body.uid}, req.body);
    const accountValidity = await Accounts.findOneAndUpdate({email: req.body.email}, req.body);
    if (accountValidity == null) {
      return res.status(409).send("Error 404: Account not found")
    }
    res.updateAccount = accountValidity
  } catch (e) {res.send(e);}
  next();
} 

async function updateBookingList(req, res, next) {
  try {
    const accountValidity = await Accounts.findOneAndUpdate(      
      { email: req.body.email }, 
      { $push: { bookingHistory: req.body.bookingHistory } },
      { new: true});
    if (accountValidity == null) {
      return res.status(404).send("Error 404: Account's booking list not found")
    }
  } catch (e) {res.send(e);}
  next();
}

async function deleteBookingEntry(req, res, next) {
  try {
    //const { email, bookingId } = req.body;

    const accountValidity = await Accounts.findOneAndUpdate(
      { email: req.body.email },
      { $pull: { bookingHistory: req.body.bookingHistory } },
      { new: true }
    );

    if (accountValidity == null) {
      return res.status(404).send("Error 404: Account's booking list not found");
    }
  } catch (e) {
    res.send(e);
  }
  next();
}

export default router;