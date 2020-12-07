const Event = require('../models/event');
const Packet = require('../models/packet');
const Order = require('../models/order');

exports.renderindex = function (req, res) {
  Event.find({}, function (err, evs) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Steun ons door massaal pasta te eten :)',
        events: evs,
      });
    }
  });
};

exports.display_order_form = function (req, res) {
  Packet.findById(req.params.id, function (err, p) {
    res.render('order_packet', {
      title: 'Order Packet',
      packet: p,
    });
  });
};

exports.post_order_form = function (req, res) {
  req.checkBody('firstname', 'Firstname is required').notEmpty();
  req.checkBody('familyname', 'Familyname is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('count', 'Count is required').notEmpty();

  // Get errors
  const err = req.validationErrors();

  if (err) {
    Packet.findById(req.params.id, function (errors, p) {
      res.render('order_packet', {
        title: 'Order Packet',
        packet: p,
        errors: err,
      });
    });
  } else {
    const order = new Order();
    order.firstname = req.body.firstname;
    order.familyname = req.body.familyname;
    order.email = req.body.email;
    order.count = req.body.count;
    order.packet = req.params.id;

    order.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        req.flash('success', 'Order Added');
        res.redirect('/');
      }
    });
  }
};
