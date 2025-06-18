var express = require('express');
var router = express.Router();

/* GET users listing */
router.get('/', function(req, res, next) {
  const name = 'name' in req.query ? req.query.name : 'Superhero';
  res.render('superhero', {name: name});
})

module.exports = router;
