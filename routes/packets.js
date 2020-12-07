const express = require('express');

const router = express.Router();

//Bring in controller
const packetcontroller = require('../controllers/packetController');
const packet = require('../models/packet');

// Bring in Model
const Packet = require('../models/packet');

// Main Route
router.get('/', packetcontroller.display_packets);

// Add Route
router.get('/add', packetcontroller.add_packet);

// Load order From
router.get('/order/:id', packetcontroller.load_order);

// Add Submit POST route
router.post('/add', packetcontroller.add_packet_post);

// Get Single Packet
router.get('/:id', packetcontroller.display_spec_packet);

// Load Edit Form
router.get('/edit/:id', packetcontroller.load_edit);

// Update Submit POST route
router.post('/edit/:id', packetcontroller.update_post);
// Delete Packet
router.delete('/:id', packetcontroller.delete_packet);

module.exports = router;
