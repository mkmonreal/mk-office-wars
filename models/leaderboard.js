const { ObjectId } = require('mongodb');

class Leaderboard {
    constructor({ _id, gameId, clasification, lastUpdate, startDate }) {
	this._id = _id || new ObjectId();
	this.gameId = gameId;
	this.clasification = clasification || [];
	this.lastUpdate = lastUpdate || new Date();
	this.startDate = startDate || new Date();
    }
}

module.exports = Leaderboard;
