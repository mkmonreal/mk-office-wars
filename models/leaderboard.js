const { ObjectId } = require('mongodb');

class Leaderboard {
    constructor({ _id, gameId, clasification, lastUpdate, startDate }) {
	this._id = new ObjectId(_id);
	console.log(`The game id is ${gameId}`);
	this.gameId = new ObjectId(gameId);
	this.clasification = clasification || [];
	this.lastUpdate = lastUpdate || new Date();
	this.startDate = startDate || new Date();
    }
}

module.exports = Leaderboard;
