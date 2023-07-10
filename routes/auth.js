const CryptoJS = require('crypto-js')
const dotenv = require('dotenv');
const router = require('express').Router();
const User = require("../models/User");


dotenv.config()

//-----------Register

router.post("/register", async (req, res)=>{
    try {
      const newUser = new  User({
        username: req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
      });
      console.log("newuser", newUser);
      const userSaved =  newUser.save();
      console.log("userSaved", userSaved);
      res.status(201).json(userSaved);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//-----------login

router.post("/login", async (req, res) => {
  // Start the try-catch block to handle errors if any
  try {
    
    // Use await to wait for the promise returned by the .findOne() method to resolve
    const user = await User.findOne({ username: req.body.username });
    
    // If the user is not found, return an error with a 401 status
    if (!user) {
      res.status(401).json("Wrong credentials: username");
      return;
    }
    
    // Decrypt the hashed password using the process.env.PASS_SECRET environment variable
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
    
    // Convert the hashed password to a Utf8 string for comparison
    const password = hashedPassword.toString(CryptoJS.enc.Utf8);
    
    // If the password provided in the request body is not equal to the hashed password
    if (password !== req.body.password) {
      res.status(401).json("Wrong credentials: password");
      return;
    }
    const {passwordd, ...others} = user._doc;
  
    
    // Return the user with a 201 status
    res.status(201).json(others);
  } catch (err) {
    // If an error is thrown, return the error with a 500 status
    res.status(500).json(err);
  }
});


module.exports = router;