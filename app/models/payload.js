var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PayloadSchema = new Schema({
    dev_id: String,
    payload_fields: JSON,
    payload_date: Date
})

module.exports = mongoose.model('Payload', PayloadSchema)