const express = require('express');

const router = express.Router();
const Packet = require('../models/packet');

const packetcontroller = require('../controllers/packetController');

//display selection menu to order certain packet
router.get('/', packetcontroller.display_order_menu);

module.exports = router;
