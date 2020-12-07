const express = require('express');

const router = express.Router();

const Order = require('../models/order');
const Event = require('../models/event');
const Packet = require('../models/packet');

const order_controller = require('../controllers/orderController');

// Main Route, if rout is given directly
router.get('/', order_controller.renderindex);

// Order with ID route

router.get('/:id', order_controller.display_order_form);

// Update Submit POST route
router.post('/:id', order_controller.post_order_form);

module.exports = router;
