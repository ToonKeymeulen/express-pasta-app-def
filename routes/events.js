const express = require('express');

const router = express.Router();

// Bring in Model
const Event = require('../models/event');
// eslint-disable-next-line camelcase
const event_controller = require('../controllers/eventController');

// Main Route
router.get('/', event_controller.evenementen);

// Get Single Event
router.get('/:id', event_controller.render_one);

// Load Edit Form(only used during development)
router.get('/edit/:id', function (req, res) {
  Event.findById(req.params.id, function (err, p) {
    res.render('edit_event', {
      title: 'Edit Event',
      event: p,
    });
  });
});

// Update Submit POST route(only used during development)
router.post('/edit/:id', function (req, res) {
  const event = {};
  event.title = req.body.title;
  event.price = req.body.price;
  event.description = req.body.description;

  const query = { _id: req.params.id };

  Event.updateOne(query, event, function (err) {
    if (err) {
      console.log(err);
    } else {
      req.flash('success', 'Event Updated');
      res.redirect('/');
    }
  });
});

// Delete Event (only used during development)
router.delete('/:id', function (req, res) {
  const query = { _id: req.params.id };

  Event.deleteOne(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.send('Success');
  });
});

module.exports = router;
