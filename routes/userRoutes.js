const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel")

router.get('/',async (req,res) => {
    
    const users = await userModel.find({});
    res.status(200).json(users);
})

router.post('/signup',async (req,res) => {
    const {firstName,lastName,email,password} = req.body;

    if(!firstName || !email || !password || !lastName){
        res.status(400)
        res.send("Enter all the fields");
    }
    const check = await userModel.findOne({email : email});

    if(check){
        res.status(400)
        res.send("Email already existed");
    }

    const User = await userModel.create({
        firstName : firstName,
        lastName: lastName,
        email : email,
        password : password,
    });

    await User.save();

    if(!User){
        req.status(400)
        res.send("known error occur");
    }

    res.status(200).json({
        firstName : firstName,
        lastName: lastName,
        email : email,
        password : password,
    }
    )
})

router.post('/login', async (req,res) => {
    const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    res.send("Enter all the fields");
  }

  const User = await userModel.findOne({ email: email });
  console.log(User);
  if (!User) {
    res.status(400);
    res.send("User does not exist");
  }

  

  if (!User || password != User.password) {
    res.status(400);
    res.send("Incorrect Password");
  }

  res.status(200).json({
    // _id: User._id,
    firstName: User.firstName,
    lastName: User.lastName,
    email: User.email,
    password: User.password,
  });
})

module.exports = router;