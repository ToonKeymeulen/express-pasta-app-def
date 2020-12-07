const express = require('express');

const router = express.Router();

// Main Route
router.get('/', function (req, res) {
  res.render('about');
});

module.exports = router;
