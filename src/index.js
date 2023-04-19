const express = require('express');
var cors = require('cors')
const mailchimp = require('@mailchimp/mailchimp_marketing');
const route = require('./route');
require('dotenv').config();
const mongoose = require('mongoose')
const app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// parse application/json
app.use(bodyParser.json())
const port = process.env.PORT;
const connectDB = async () => {
    try {
      await mongoose.connect(
        process.env.MONGODB_URI,
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


mailchimp.setConfig({
  apiKey: '388f7b7d7cc99067c85622027205eeb7',
  server: 'us21',
});
const listId = "9650";
async function run() {
  const myUsers = [
    {
      id: "1",
      email: "letatchinh123@gmail.com",
    },
    {
      id: "2",
      email: "letatchinh132@gmail.com"
    }
  ];

  const operations = myUsers.map((user, i) => ({
    method: "POST",
    path: `/lists/${listId}/members}`,
    operation_id: user.id,
    body: JSON.stringify({
      email_address: user.email,
      status: "subscribed"
    })
  }));

  const response = await mailchimp.batches.start({
    operations
  });
  console.log(response);
}

run();

route(app)
app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})