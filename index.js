//----------Libraries--------------
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const useRouter = require('./routes/user')
//+++++++++++++++++++++++++++++++++

const app = express();
dotenv.config()

//--------------middle--------
app.use(express.json())

//--------------Routes-------------------
app.use('/api/users', useRouter)


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