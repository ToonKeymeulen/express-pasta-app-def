const mongoose = require('mongoose');

// Packet Schema
const packetSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Packet', packetSchema);
