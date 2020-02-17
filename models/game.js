const { ObjectId } = require('mongodb');

class Game {
    constructor(name, playersPerGame, pointsByPosition, id, startDate) {
        this.name = name;
        this.playersPerGame = playersPerGame;
        this.pointsByPosition = pointsByPosition;
        this._id = new ObjectId(id);
        this.startDate = startDate || new Date();
    }

    getPointsByPosition(position) {
	return this.pointsByPosition[position];
    }

    getPlayersMultiplier(players) {
	if (players >= this.playersPerGame) return 1;
	return (players - 1) / (this.playersPerGame - 1);
    }

    static parseGame(game) {
	return new Game(game.name, game.playersPerGame, game.pointsByPosition, game._id, game.startDate);
    }
}

module.exports = Game;
