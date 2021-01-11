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

// function init(){
//     var array = [
//         { Hum: 61, Level: 12, Temp: 27.1 , time: '2020-07-13T10:01:00.790279537Z'},
//         { Hum: 60, Level: 12, Temp: 27.2 , time: '2020-07-13T10:10:00.790279537Z'},
//         { Hum: 61, Level: 12, Temp: 27.4 , time: '2020-07-13T10:21:00.790279537Z'},
//         { Hum: 59, Level: 12, Temp: 27.3 , time: '2020-07-13T10:31:00.790279537Z'},
//         { Hum: 59, Level: 12, Temp: 27.2 , time: '2020-07-13T10:40:00.790279537Z'},
//         { Hum: 58, Level: 12, Temp: 27.5 , time: '2020-07-13T10:49:00.790279537Z'},
//         { Hum: 57, Level: 12, Temp: 27.5 , time: '2020-07-13T10:57:00.790279537Z'},
//         { Hum: 58, Level: 12, Temp: 27.6 , time: '2020-07-13T11:08:00.790279537Z'},
//         { Hum: 56, Level: 12, Temp: 27.7 , time: '2020-07-13T11:17:00.790279537Z'},
//         { Hum: 55, Level: 12, Temp: 27.8 , time: '2020-07-13T11:29:00.790279537Z'},
//         { Hum: 56, Level: 12, Temp: 27.9 , time: '2020-07-13T11:40:00.790279537Z'},
//         { Hum: 55, Level: 12, Temp: 27.8 , time: '2020-07-13T11:49:00.790279537Z'},
//         { Hum: 57, Level: 12, Temp: 27.9 , time: '2020-07-13T11:58:00.790279537Z'},
//         { Hum: 56, Level: 12, Temp: 28.0 , time: '2020-07-13T12:11:00.790279537Z'},
//         { Hum: 55, Level: 12, Temp: 28.1 , time: '2020-07-13T12:20:00.790279537Z'},
//         { Hum: 54, Level: 12, Temp: 28.3 , time: '2020-07-13T12:32:00.790279537Z'},
//         { Hum: 53, Level: 12, Temp: 28.3 , time: '2020-07-13T12:41:00.790279537Z'},
//         { Hum: 54, Level: 12, Temp: 28.4 , time: '2020-07-13T12:50:00.790279537Z'},
//         { Hum: 53, Level: 12, Temp: 28.6 , time: '2020-07-13T12:59:00.790279537Z'},
//         { Hum: 53, Level: 12, Temp: 28.7 , time: '2020-07-13T13:10:00.790279537Z'},
//         { Hum: 53, Level: 12, Temp: 28.8 , time: '2020-07-13T13:19:00.790279537Z'},
//         { Hum: 52, Level: 12, Temp: 29.0 , time: '2020-07-13T13:30:00.790279537Z'},
//         { Hum: 52, Level: 12, Temp: 28.9 , time: '2020-07-13T13:39:00.790279537Z'},
//         { Hum: 51, Level: 12, Temp: 29.0 , time: '2020-07-13T13:48:00.790279537Z'},
//         { Hum: 52, Level: 12, Temp: 29.2 , time: '2020-07-13T13:57:00.790279537Z'},
//         { Hum: 52, Level: 12, Temp: 29.1 , time: '2020-07-13T14:06:00.790279537Z'},
//         { Hum: 51, Level: 12, Temp: 29.3 , time: '2020-07-13T14:15:00.790279537Z'},
//         ]

//     array.forEach(element => {
//         var payload = {
//             app_id: 'lora-node-jcarloscandela',
//             dev_id: 'sensor2',
//             payload_fields: { Hum: element.Hum, Level: element.Level, Temp: element.Temp },
//             metadata: { time: element.time }  
//         }

//         nodo.createNode(payload);
//     });
// }

// function init(){
//     var filename = 'datos.txt';

//     var datos = fs.readFileSync(filename, 'utf8');

//     var lineas = datos.split(';');

//     console.log(lineas);
//     if(lineas.length > 1){
//         console.log(lineas[lineas.length - 2])
//     }
// }

// init();

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

 
      
