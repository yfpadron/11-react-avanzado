const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    vendor: { type: String, required: true },
    status: { type: Boolean, required: true },
    created: { type: Date, required: true },
    gatewayId: { type: Schema.Types.ObjectId, ref: 'Gateway', required: true }

})

module.exports = mongoose.model('Device', deviceSchema);