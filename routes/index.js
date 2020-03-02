var express = require('express');
var router = express.Router();
var gameService = require('../services/game');

let LeaderboardService = require('../services/leaderboard');

/* GET home page. */
router.get('/', async function(req, res, next) {
    let leaderboards = await LeaderboardService.getLeaderboardsWithGames();
    console.log(leaderboards);
    res.render('index', {
	title: "Mario Kart Office Wars",
	leaderboards: leaderboards });
});

module.exports = router;
