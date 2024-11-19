const mongoose= require("mongoose");
const express = require("express");
const router = express.Router()
const usermodel = require("../model/user")
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const jwtsecret= "MyNameIsPalak"
//SIGNUP
router.post("/createuser",[ 
  body('name').isLength({ min: 3}).withMessage('name must be at least 3characters long'),
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password','incorrect password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  body('location').isLength({ min: 3}).withMessage('location must be at least 3 characters long'),
  body('contact_no').isLength({  min: 10, max: 10 }).isNumeric().withMessage('contact_no  must be at least 10 characters long'),
  
],
async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //const salt = await bcrypt.genSalt(10);
  let setPassword = await bcrypt.hash(req.body.password,10)
try{
  await usermodel.create({
    name: req.body.name,
    email: req.body.email,
    password: setPassword,
    location: req.body.location,
    contact_no:req.body.contact_no
  }).then(res.json({success:true}))
}
catch(error){
  console.log(error)
  res.json({success:false});
}
})

//LOGIN
router.post("/loginuser",[ 

  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password','incorrect password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')],
  async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let email= req.body.email;
try{
  let userdata= await usermodel.findOne({email});
   if(!userdata){
    return res.status(400).json({ errors: "Try Login With Correct Credentials" });
   }
    const passcompare=  await bcrypt.compare(req.body.password,userdata.password)
   if(!passcompare){
    return res.status(400).json({ errors: "Try Login With Correct Credentials" });
   }
   
   const data ={
    user:{
      id:userdata.id
    }
   }
   const authtoken= jwt.sign(data,jwtsecret)
   return res.json({ success:true,authtoken:authtoken });
}
catch(error){
  console.log(error)
  res.json({success:false});
}
})

module.exports=router;

