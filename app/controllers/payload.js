var Payload = require('../models/payload'); // get our mongoose model
var Nodo = require('../models/node'); // get our mongoose model
var fs = require('fs');

function save(dev_id, payload_fields, metadata) {
    let payload = new Payload();
    payload.dev_id = dev_id;

    var filename = 'datos.txt';

    var datos = fs.readFileSync(filename, 'utf8');

    var lineas = datos.split(';');

    var linea = lineas[lineas.length - 2];
    
    var hum = linea.split(',')[0];
    var temp = linea.split(',')[1];
    var level = 10;

    var payloadfields = { "Hum": hum, "Level": 100, "Temp": temp};

    if(dev_id == 'sensor3'){
        payload.payload_fields = payload_fields;
    } else {
        payload.payload_fields = payloadfields;
    }
    //

    payload.payload_date = metadata.time;

    payload.save();

    Nodo.findOne({dev_id: dev_id}).exec(
        function(err,sensor){
            if (err) {
                console.log('Error obteniendo el sensor para actualiazr su último payload')
            }

            if (!sensor) {
                console.log('El sensor no existe')
            } else {
                sensor.lastPayload = payload;
                sensor.save();
            }
        }
    )
}

function getLastPayload(req, res) {
    if (req.params.dev_id) {
        Payload.findOne({ dev_id: req.params.dev_id })
            .sort([['payload_date', -1]])
            .exec(function (err, payload) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error obteniendo el payload del sensor'
                    });
                }
                if (!payload) {
                    return res.status(404).json({
                        message: 'El sensor no tiene payload almacenado'
                    });
                }

                return res.json(payload);
            })
    } else {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
}

function getLastPayloads(req, res) {
    if (req.params.dev_id) {
        Payload.find({ dev_id: req.params.dev_id })
            .sort([['payload_date', +1]])
            //.limit(10)
            .exec(function (err, payloads) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error obteniendo el payload del sensor'
                    });
                }
                if (!payloads) {
                    return res.status(404).json({
                        message: 'El sensor no tiene payload almacenado'
                    });
                }

                return res.json(payloads);
            })
    } else {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
}

module.exports = {
    save,
    getLastPayload,
    getLastPayloads
}