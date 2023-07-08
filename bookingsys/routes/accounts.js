const express=require('express')
const router=express.Router()
const hotel=require('../models/accounts')
const accounts = require('../models/accounts')
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

router.get('/:emailid',(req,res) =>{
    /*try{
        const  accounts= await acconts.find()
        res.json(accounts)
    }catch(err){
        res.status(500).json({ message:err.message})
    }*/
    res.send(req.params.id)
})

//Creating One
router.post('/',async(req,res)=>{
    const account = new accounts({
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




module.exports=router