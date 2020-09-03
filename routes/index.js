var express = require('express');
var router = express.Router();
var gameService = require('../services/game');

let LeaderboardService = require('../services/leaderboard');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json(req.body);
});

module.exports = router;
