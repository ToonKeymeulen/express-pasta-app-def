const async = require('async');

const Event = require('../models/event');
const Order = require('../models/order');

// Render the index page with one upcoming event
exports.index = function (req, res) {
  async.parallel(
    {
      order_count(callback) {
        Order.countDocuments({}, callback);
      },
      event(callback) {
        Event.findOne({ title: 'Online Kerstspel' }, callback);
      },
    },
    function (err, results) {
      res.render('index', {
        title: 'Pasta-actie van scouts Hubertus',
        error: err,
        data: results,
      });
    }
  );
};

/*  Event.findOne({ title: 'Online Kerstspel' }, function (err, ev) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Pasta-actie van Scouts Hubertus',
        event: ev,
      });
    }
  });
  };
*/
/* async.parallel({
    book_count: function(callback) {
        Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
    },
    book_instance_count: function(callback) {
        BookInstance.countDocuments({}, callback);
    },
    book_instance_available_count: function(callback) {
        BookInstance.countDocuments({status:'Available'}, callback);
    },
    author_count: function(callback) {
        Author.countDocuments({}, callback);
    },
    genre_count: function(callback) {
        Genre.countDocuments({}, callback);
    }
}, function(err, results) {
    res.render('index', { title: 'Local Library Home', error: err, data: results });
});
*/
// render the event page with all the events
exports.evenementen = function (req, res) {
  Event.find({}, function (err, evs) {
    if (err) {
      console.log(err);
    } else {
      res.render('events', {
        title: 'Events',
        events: evs,
      });
    }
  });
};

// render event page for one event

exports.render_one = function (req, res) {
  Event.findById(req.params.id, function (err, p) {
    res.render('event', {
      event: p,
    });
  });
};
