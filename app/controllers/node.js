var Node  = require('../models/node'); // get our mongoose model
var payload = require('./payload');

function createNode(sensorRaw){
    Node.find({dev_id: sensorRaw.dev_id}, function(err, nodo){
        if(err){
            console.log(err);
        }else{
            if(nodo.length == 0){
                let nodo = new Node();
                nodo.app_id = sensorRaw.app_id;
                nodo.dev_id = sensorRaw.dev_id;
                nodo.hardware_serial = sensorRaw.hardware_serial;
                nodo.metadata = sensorRaw.metadata;
    
                nodo.save(function(err, nodo){
                    if(err){
                        console.log('Error al crear el nodo');
                    }
                    console.log('Nodo creado');
                });
            }
            else{
                console.log('El nodo ya existe');
            }

            payload.save(sensorRaw.dev_id, sensorRaw.payload_fields, sensorRaw.metadata);
        }       
    })
}

function getNodes(req, res){
    Node.find({}, function(err, sensors){
        if(err){
          return res.status(500).json({
            message: 'Error obteniendo los sensores'
          });
        }
        
        return res.json(sensors);
    })
}

function getNode(req,res){
    if(req.params.dev_id){
        Node.findOne({dev_id: req.params.dev_id}, function(err, nodo){
            if(err){
                return res.status(500).json({
                  message: 'Error obteniendo el nodo'
                });
              }
              if(!nodo){
                return res.status(404).json({
                  message: 'No existe el nodo'
                });
              }
              return res.json(nodo);
        })
    } else {
        return res.status(400).json({
            message: 'Bad request'
          });  
    }
}

module.exports = {
    createNode,
    getNode,
    getNodes
}