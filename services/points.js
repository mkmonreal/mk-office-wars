const Game = require('../models/game');
const Participation = require('../models/participation');

const leaderboardService = require('./leaderboard');

let addPoints = async function (id, points) {
    let now = new Date();

    let leaderboard = await leaderboardService.getLeaderboardByIdWithGame(id);
    let game = Game.parseGame(leaderboard.game[0]);
    let playersMultiplier = game.getPlayersMultiplier(points.length);
    
    points.forEach(x => {
	x.points = x.positions.map(y => game.getPointsByPosition(y - 1));
	x.playersMultiplier = playersMultiplier;
	x.finalPoints = x.points.map(y => parseInt(y * playersMultiplier));
    });
	
	console.log(points);

};

module.exports = {
    addPoints
};
