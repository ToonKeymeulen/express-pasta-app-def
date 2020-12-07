const Event = require('../models/event');
const Packet = require('../models/packet');
const Order = require('../models/order');

//display the packets to order
exports.display_order_menu = function (req, res) {
  Packet.find({}, function (err, packs) {
    if (err) {
      console.log(err);
    } else {
      res.render('packets_order', {
        title: 'Packets',
        packets: packs,
      });
    }
  });
};

//display different packets with pictures
exports.display_packets = function (req, res) {
  Packet.find({}, function (err, packs) {
    if (err) {
      console.log(err);
    } else {
      res.render('packets', {
        title: 'Packets',
        packets: packs,
      });
    }
  });
};

//Add packet
exports.add_packet = function (req, res) {
  res.render('add_packet', {
    title: 'Voeg uw pakket toe',
  });
};

//Load order form
exports.load_order = function (req, res) {
  Packet.findById(req.params.id, function (err, p) {
    res.render('order_packet', {
      title: 'Order Packet',
      packet: p,
    });
  });
};

// Add Submit Post route
exports.add_packet_post = function (req, res) {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('price', 'Price is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();

  // Get errors
  const err = req.validationErrors();

  if (err) {
    res.render('add_packet', {
      title: 'Voeg uw pakket toe',
      errors: err,
    });
  } else {
    const packet = new Packet();
    packet.title = req.body.title;
    packet.price = req.body.price;
    packet.description = req.body.description;
    packet.image_link = 'standaard';

    packet.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        req.flash('success', 'Packet Added');
        res.redirect('/');
      }
    });
  }
};

//GET single packet

exports.display_spec_packet = function (req, res) {
  Packet.findById(req.params.id, function (err, p) {
    res.render('packet', {
      packet: p,
    });
  });
};

//LOAD edit form
exports.load_edit = function (req, res) {
  Packet.findById(req.params.id, function (err, p) {
    res.render('edit_packet', {
      title: 'Wijzig dit pakket',
      packet: p,
    });
  });
};

// Update Submit POST route
exports.update_post = function (req, res) {
  const packet = {};
  packet.title = req.body.title;
  packet.price = req.body.price;
  packet.description = req.body.description;

  const query = { _id: req.params.id };

  Packet.updateOne(query, packet, function (err) {
    if (err) {
      console.log(err);
    } else {
      req.flash('success', 'Packet Updated');
      res.redirect('/');
    }
  });
};

//DELETE packet
exports.delete_packet = function (req, res) {
  const query = { _id: req.params.id };

  Packet.deleteOne(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.send('Success');
  });
};
