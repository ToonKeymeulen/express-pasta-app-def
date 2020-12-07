const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const compression = require('compression');
const helmet = require('helmet');




// Set port number
const port = 3000;

// Set mongodb link


const dev_db_url = 'mongodb+srv://emile:pasta123@pastapacket.pz52b.mongodb.net/PastaPacket?retryWrites=true&w=majority'
const mongoDB = process.env.MONGODB_URI || dev_db_url;

// Load database
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check connection
db.once('open', function () {
  console.log('Connected to mongoDB.');
});

// Check db errors
db.on('error', function (err) {
  console.log(err);
});

// Init app
const app = express();

app.use(compression());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Bring in Models
const Packet = require('./models/packet');
const Event = require('./models/event');
const Order = require('./models/order');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

// Express Messages Middleware
app.use(flash());

app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

// eslint-disable-next-line camelcase
const event_controller = require('./controllers/eventController');

// Home route
app.get('/', event_controller.index);

// About route
app.get('/about', function (req, res) {
  res.render('about');
});

// Route Files
const packets = require('./routes/packets');
const events = require('./routes/events');
const packets_order = require('./routes/packets_order');
const order = require('./routes/order');

app.use('/packets', packets);
app.use('/events', events);
app.use('/packets_order', packets_order);
app.use('/order', order);

// Start server
app.listen(port, function () {
  console.log(`Express server listening on port ${port}!`);
});
