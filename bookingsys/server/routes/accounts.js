import express from "express";
import Accounts from "../models/Accounts.js";

const router = express.Router();

//Getting all accounts and listing them down.
router.get('/',async(req,res) =>{
try{
        const account = await Accounts.find()
        res.json(account)
    }catch(err){
        res.status(500).json({ message:err.message})
    }
    //res.send('hello world')
})

// Deleting an account.
router.delete('/:emailId', getAccount, async (req, res) => {
  try {
    await res.account.deleteOne();
    res.json({ message: 'Deleted account' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Updating an account.
router.patch('/:emailId', getAccount, async (req, res) => {
    if (req.body.emailId!= null) {
      res.account.emailId = req.body.emailId
    }
    if (req.body.emailId != null) {
      res.account.emailId = req.body.emailId
    }
    try {
      const updatedAccount = await res.account.save();
      res.json(updatedAccount);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// This creates an account using a post.
router.post('/create',async(req,res)=>{
    const account = new Accounts({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        bookingInfo: JSON.parse("{}"),
    })
    try{
        const newaccounts = await account.save()
        res.status(201).json(newaccounts)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

async function getAccount(req, res, next) {
    try {
      const account = await Accounts.findOne({ email: req.params.email });
      if (account == null) {
        return res.status(404).json({ message: 'Cannot find account' });
      }
      res.account = account;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

export default router;