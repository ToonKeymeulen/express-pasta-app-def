const mongoose = require('mongoose');

// Event Schema
const orderSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  familyname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  packet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Packet',
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
