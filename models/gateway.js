const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gatewaySchema = new Schema({
    name: { type: String, required: true },
    ip: { type: String, required: true },
    deviceCount: { type: Number, default: 0 }

})


module.exports = mongoose.model('Gateway', gatewaySchema);