const express=require('express');
const hotel=require('../models/User');
const router = express.Router();

//Getting all
router.get('/',async(req,res) =>{
try{
        const accounts= await hotel.find()
        res.json(accounts)
    }catch(err){
        res.status(500).json({ message:err.message})
    }
    //res.send('hello world')
})

// Deleting an account
router.delete('/:emailId', getAccount, async (req, res) => {
  try {
    await res.account.deleteOne();
    res.json({ message: 'Deleted account' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Updating an account
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

router.get('/:emailId',async(req,res) =>{
    try{
        const  accounts= await hotel.find()
        res.json(accounts)
    }catch(err){
        res.status(500).json({ message:err.message})
    }
    //res.send(req.params)
})

//Creating One
router.post('/',async(req,res)=>{
    const account = new hotel({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        emailId: req.body.emailId,
        password:req.body.password,
        Phone: req.body.phone,
        hotelpointer: req.body.hotelpointer,
        userName: req.body.userName
    })
    try{
        const newaccounts= await account.save()
        res.status(201).json(newaccounts)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

async function getAccount(req, res, next) {
    try {
      const account = await hotel.findOne({ emailId: req.params.emailId });
      if (account == null) {
        return res.status(404).json({ message: 'Cannot find account' });
      }
      res.account = account;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  




module.exports=router