var express = require('express');
var router = express.Router();
const gameService = require('../services/game');
const  leaderboardService = require('../services/leaderboard');

/* GET home page. */
router.get('/', async function (req, res, next) {
    let games = await gameService.getGamesWithLeaderboard();

    res.render('game', {
        title: 'Mario kart wars',
        games
    });
});

router.post('/add-game', async function (req, res, next) {
    const { name, players, points} = req.body;
    let maxPlayers = parseInt(players);
    let pointsByPosition = points.split(" ").map(point => parseInt(point));
    
    await gameService.createNewGame(name, maxPlayers, pointsByPosition);

    res.redirect('/game');
});

module.exports = router;
