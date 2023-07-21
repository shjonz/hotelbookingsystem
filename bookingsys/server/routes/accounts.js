import express from "express";
import Accounts from "../models/Accounts.js";

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
  res.status(201).send("Account succesfully created.")
})

// Updates an account with everything you put into the body. This works for emails passwords and name because why the heck should it not. Do note that this is specifically meant for bookingHistory, in which you put the _id (UID) of the booking made as an array. For example... 
//bookingHistory : ["64b7b57c7ce93fc68ac620c3"] ** Note that this doesn't check for valid bookings, not that it should be used without confirming a booking's UID.
router.patch("/one", updateAccount, (req, res) => {
  res.status(200).send("Account successfully updated.")
})

// Function Space

async function getAllAccounts(req, res, next) {
  try {
    const getAllAccounts = await Accounts.find({});
    res.getAllAccounts = getAllAccounts;
    next()
  } catch (e) {res.send(e);}
 // next();
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
  try {
    const accountValidity = await Accounts.findById(req.query.uid)
    if (accountValidity != null) {
      await Accounts.findByIdAndDelete(`${req.query.uid}`)
    } else {
      return res.status(404).send("Error 404: Account not found")
    }
  } catch (e) {res.send(e);}
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
    } else {
      return res.status(409).send("Error 409: Email already Registered")
    }
  } catch (e) {res.send(e);}
  next();
}

async function updateAccount(req, res, next) {
  try {
    const accountValidity = await Accounts.findOneAndUpdate({_id: req.body.uid}, req.body)
    if (accountValidity == null) {
      return res.status(409).send("Error 404: Account not found")
    }
  } catch (e) {res.send(e);}
  next();
}


// // Updating an account.
// router.patch('/:emailId', getAccount, async (req, res) => {
//     if (req.body.emailId!= null) {
//       res.account.emailId = req.body.emailId
//     }
//     if (req.body.emailId != null) {
//       res.account.emailId = req.body.emailId
//     }
//     try {
//       const updatedAccount = await res.account.save();
//       res.json(updatedAccount);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

export default router;