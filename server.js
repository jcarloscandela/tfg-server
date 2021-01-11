const ttn = require("ttn")
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const readFile = require('readline');

var config = require('./config'); 
var app   =  require('./app');
var nodo = require('./app/controllers/node');
var fs = require('fs');

var mongoOpts = {
    useNewUrlParser: true, 
    useUnifiedTopology:true,
    useCreateIndex:true
};
mongoose.connect(config.db, mongoOpts);

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.listen(config.port, () => console.log('server started'));

var appID = "lora-node-jcarloscandela"
var accessKey = "ttn-account-v2.887Flf39sj7QaSAteMdXc8t0VSEpfc1A-kSVKcQEiu8"

console.log("Program running")

ttn.data(appID, accessKey).then(function (client) {
    client.on("uplink", function (devID, payload) {
        console.log("Received uplink from ", devID)
        console.log(payload);
        nodo.createNode(payload);
    })
})
.catch(function (error) {
    console.error("Error", error)
    process.exit(1)
})

      
