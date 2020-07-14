var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const NodeSchema = new Schema({
    app_id: String,
    dev_id: {type: String, unique: true},
    hardware_serial: String,
    metadata: JSON,
    lastPayload: JSON
})


module.exports = mongoose.model('Node', NodeSchema)