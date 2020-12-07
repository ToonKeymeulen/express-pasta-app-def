const mongoose = require('mongoose');

const { DateTime } = require('luxon');

// Event Schema
const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

eventSchema.virtual('due_back_formatted').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Event', eventSchema);
