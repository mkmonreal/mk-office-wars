 const { ObjectId } = require('mongodb');

class Game {
    constructor({ _id, name, playersPerGame, pointsByPosition, startDate }) {
        this._id = new ObjectId(_id);
	this.name = name;
        this.playersPerGame = playersPerGame;
        this.pointsByPosition = pointsByPosition;
        
        this.startDate = startDate || new Date();
    }

    getPointsByPosition(position) {
	return this.pointsByPosition[position];
    }

    getPlayersMultiplier(players) {
	if (players >= this.playersPerGame) return 1;
	return (players - 1) / (this.playersPerGame - 1);
    }
}

module.exports = Game;
