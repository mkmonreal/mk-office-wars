var express = require('express');
var router = express.Router();
var gameService = require('../services/game');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Mario Kart Office Wars',
players: [{name: 'Miguel', points: 1500}, {name: 'Iván', points: 150}, {name: 'Elene', points: 140}] });
});

module.exports = router;
