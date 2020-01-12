const Game = require('../models/game');

const leaderboardService = require('./leaderboard');

let addPoints = async function (id, points) {
    let now = new Date();

    let leaderboard = await leaderboardService.getLeaderboardByIdWithGame(id);
    let timeMultiplier = Math.abs(leaderboard.lastUpdate - now) / Math.abs(leaderboard.startDate - now);

    let game = Game.parseGame(leaderboard.game[0]);
    console.log(game.getPointsByPosition(3));
};

module.exports = {
    addPoints
};
