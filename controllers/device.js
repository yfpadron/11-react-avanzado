const DeviceModel = require('../models/device');
const GatewayModel = require('../models/gateway');


exports.getDevicesByGatewayId = async (req, res, next) => {
    const gatewayId = req.params.id;
    const result = await DeviceModel.find({ gatewayId: gatewayId });
    res.status(200).json(result)
}

exports.createDevice = (req, res, next) => {
    const vendor = req.body.vendor;
    const status = req.body.status;
    const gatewayId = req.body.gatewayId;
    const created = new Date();
    const deviceObject = new DeviceModel({ vendor, status, gatewayId, created });
    deviceObject.save()
        .then(device => {
            GatewayModel.findById(gatewayId).then(gateway => {
                if (gateway) {
                    gateway.deviceCount = gateway.deviceCount + 1;

                }
                return gateway.save();
            })
        })
        .then(result => {
            res.status(201).json({ message: 'Device was created successfully.' })

        })
        .catch(err => {
            res.status(500).json({ message: 'An error has happened while inserting a device', error: err })
        })
}

exports.deleteDevice = (req, res, next) => {
    const id = req.params.id;
    DeviceModel.findById(id)
        .then(device => {
            return GatewayModel.findById(device.gatewayId);
        })
        .then(gateway => {
            gateway.deviceCount = gateway.deviceCount - 1;
            return gateway.save();
        })
        .then((g) => {
            return DeviceModel.findByIdAndRemove(id)
        })
        .then(result => {
            res.status(200).json({ message: 'Device was deleted successfully.' })
        }).catch(err => {
            res.status(500).json({ message: 'An error has happened while deleting a device', error: err })
        })
}