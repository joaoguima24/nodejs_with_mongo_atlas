
const express = require('express');
const mongoose = require('mongoose');
const personController = require('./controllers/personController');
const app = express();
require('dotenv').config();

app.use(
    express.urlencoded({
        extended:true,
    })
);

//Allowing the express to receive json objects from our posts
app.use(express.json());

//creating a route for every call to /person... goes to the person controller
app.use('/person', personController);

app.get('/',(req,res)=>{
    res.json({message:"Hello World"});
})

//connecting with the mongo atlas with env variables
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.rb4kevf.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log("connected to DB");
    app.listen(3000);
})
.catch((err)=>console.log(err));