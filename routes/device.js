const express = require('express');

const router = express.Router();

const deviceController = require('../controllers/device');

// GET LIST DEVICES
router.get('/device/:id', deviceController.getDevicesByGatewayId);

// POST ADD DEVICE
router.post('/device', deviceController.createDevice);

// DELETE DEVICE
router.delete('/device/:id', deviceController.deleteDevice);

module.exports = router;