const ttn = require("ttn")
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

var config = require('./config'); 
var app   =  require('./app');
var nodo = require('./app/controllers/node');

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

// Payload test: 00 00 a0 41 00 00 e8 41 0c 00 00 00 
ttn.data(appID, accessKey).then(function (client) {
    client.on("uplink", function (devID, payload) {
        console.log("Received uplink from ", devID)
        console.log(payload);
        nodo.createNode(payload);

        // console.log(payload.dev_id)
        // console.log(payload.payload_fields)
        // console.log(payload.payload_fields.Temp)
    })
})
.catch(function (error) {
    console.error("Error", error)
    process.exit(1)
})

// app.get('/test', (req, res) => {
//     // code to retrieve an article...
//     console.log('test')
//     res.json(nodeInfo);
// });

// app.delete('/articles/:id', (req, res) => {
//     const { id } = req.params;
//     // code to delete an article...
//     res.json({ deleted: id });
// });

 
      
