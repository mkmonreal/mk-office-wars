var express = require('express');
var router = express.Router();
var gameService = require('../services/game');
const leaderboardService = require('../services/leaderboard');
const pointsService = require('../services/points');

router.post('/', async (req, res, next) => {
    try {
	const params = req.body;
	const leaderboard = await leaderboardService.createLeaderboard(params.name, params.playersPerGame, params.pointsByPosition);
	res.json(leaderboard);
    }
    catch (err) {
	console.error(err);
	
    }
});

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

    console.log(leaderboard);
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
    let redirection = '/leaderboard/' + id;
    playersAndPositions.forEach(player => {
	points.push({
	    name: player.split(' - ')[0],
	    positions: player.split(' - ')[1].split(' ').map(position => parseInt(position))
	});
    });

    try {
	let result = await pointsService.addPoints(id, points);
    }
    catch(err) {
	console.error(err);
    }
});

module.exports = router;
