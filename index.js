//----------Libraries--------------
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//+++++++++++++++++++++++++++++++++

const app = express();
dotenv.config()


console.log(typeof(process.env.MONGO_URL))
//----------Mongo-Conection-------------
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("conection sucessfull");
})
.catch((err) => {console.log(err)})
//++++++++++++++++++++++++++++++++++++++

app.listen(process.env.PORT || 5000,() =>{
    console.log("backend server is running")
})