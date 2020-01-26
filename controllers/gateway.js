const GatewayModel = require('../models/gateway');
const DeviceModel = require('../models/device');


exports.getGateways = async (req, res, next) => {
    const result = await GatewayModel.find();
    res.status(200).json(result)
}

exports.createGateway = (req, res, next) => {
    const name = req.body.name;
    const ip = req.body.ip;
    const gatewayObject = new GatewayModel({ name, ip });
    gatewayObject.save()
        .then(result => {
            if (result)
                res.status(201).json({ message: 'Gateway was created successfully.' })

        })
        .catch(err => {
            res.status(500).json({ message: 'An error has happened while inserting a gateway', error: err })
        })
}

exports.updateGateway = (req, res, next) => {
    const name = req.body.name;
    const ip = req.body.ip;
    const id = req.body.id;
    GatewayModel.findById(id).then(gateway => {
        gateway.name = name;
        gateway.ip = ip;
        return gateway.save()
    }).then(result => {
        if (result)
            res.status(201).json({ message: 'Gateway was updated successfully.' })

    })
        .catch(err => {
            res.status(500).json({ message: 'An error has happened while inserting a gateway', error: err })
        })
}

exports.deleteGateway = async (req, res, next) => {
    const gatewayId = req.params.id;
    await DeviceModel.deleteMany({ gatewayId: gatewayId });
    GatewayModel.findByIdAndRemove(gatewayId).then(result => {
        res.status(200).json({ message: 'Gateway was deleted successfully.' })
    }).catch(err => {
        res.status(500).json({ message: 'An error has happened while deleting a gateway', error: err })
    })
}