const express = require('express');

const router = express.Router();

const gatewayController = require('../controllers/gateway');

// GET LIST GATEWAY
router.get('/gateway',gatewayController.getGateways);

// POST ADD GATEWAY
router.post('/gateway',gatewayController.createGateway);

// PUT UPDATE GATEWAY
router.put('/gateway',gatewayController.updateGateway);

// POST DELETE GATEWAY
router.delete('/gateway/:id',gatewayController.deleteGateway);

module.exports = router;