var express = require('express');
var router = express.Router();
var gameService = require('../services/game');
var leaderboardService = require('../services/leaderboard');
const pointsService = require('../services/points');

router.get('/', async function (req, res, next) {
    let leaderboards = await leaderboardService.getLeaderboards();

    res.render('leaderboard', {
	name: "",
	title: "",
	players: []
    });
});

router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    
    let leaderboard = await leaderboardService.getLeaderboardById(id);

    res.render('leaderboard', {
	id: leaderboard._id,
	name: "",
	title: "",
	players: []
    })
});

router.post('/add-points', async function (req, res, next) {
    const { id, raw } = req.body;

    let playersAndPositions = raw.split('\r\n');
    let points = [];
    playersAndPositions.forEach(player => {
	points.push({
	    name: player.split(' - ')[0],
	    positions: player.split(' - ')[1].split(' ').map(position => parseInt(position))
	});
    });

    await pointsService.addPoints(id, points);

    res.redirect('/leaderboard/' + id);
});

module.exports = router;
