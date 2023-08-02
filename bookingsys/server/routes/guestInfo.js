import express from "express";
import guestInfo from "../models/guestInfo.js";

const router = express.Router();

// Get all guest information stored in the database and send them back without any filtering.
router.get("/", getAllguestinfo, (req, res) => {
  res.status(200).send(res.getAllguestinfo)
})

// Creates one Guest Information given specific parameters. The currently required params in the body will be:

router.post("/one", createguestInfo, (req, res) => {
  res.status(201).send(res.createGuestInfo)
})


// Function Space




async function createguestInfo(req, res, next) {
  try {
    const guestValidity = await guestInfo.findOne({email: req.body.email})
    if (guestValidity == null) {
      const newguestInfo = new guestInfo({
        FirstName: req.body.FirstName,
        SecondName: req.body.SecondName,
        email: req.body.email,
        phone: req.body.phone,
        BillingAddress: req.body.billingAddress,
        specialRequest: req.body.specialRequest
    })
      const success = await newguestInfo.save()
      res.newguestInfo = newguestInfo
    } else {
      return res.status(409).send("Error 409: Email already Registered")
    }
  } catch (e) {res.send(e);}
  next();
}

async function getAllguestinfo(req, res, next) {
  try {
    const getAllguestinfo = guestInfo.find({});
    res.getAllguestinfo=getAllguestinfo;
  } catch (e) {res.send(e);}
  next();
}


export default router;