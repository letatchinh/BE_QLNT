const express = require('express');
const route = require('./route');
require('dotenv').config();
const mongoose = require('mongoose')
const app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const port = process.env.PORT;
const connectDB = async () => {
    try {
      await mongoose.connect(
        'mongodb+srv://letatchinh123:chinhancut1@cluster0.jb2stef.mongodb.net/?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      console.log('Connected to mongoDB')
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }
  
  connectDB()
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
app.get('/', function(req, res){
    res.send("Hello World");
})
route(app)
app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})