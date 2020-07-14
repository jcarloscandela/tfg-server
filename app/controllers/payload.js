var Payload = require('../models/payload'); // get our mongoose model
var Nodo = require('../models/node'); // get our mongoose model

function save(dev_id, payload_fields, metadata) {
    let payload = new Payload();
    payload.dev_id = dev_id;
    payload.payload_fields = payload_fields;
    payload.payload_date = metadata.time;

    payload.save();

    Nodo.findOne({dev_id: dev_id}).exec(
        function(err,sensor){
            if (err) {
                console.log('Error obteniendo el sensor para actualiazr su último payload')
            }

            if (!sensor) {
                console.log('El sensor no existe')
            }

            sensor.lastPayload = payload;

            sensor.save();
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