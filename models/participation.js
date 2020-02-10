const { ObjectId } = require('mongodb');

class Participation {
    constructor(leaderboardId, playerId, position, points, playersMultiplier, id, date) {
	this.leaderboardId = leaderboardId;
	this.playerId = playerId;
	this.position = position;
	this.points = points || 0;
	this.playersMultiplier = playersMultiplier || 0;
	this._id = new ObjectId(id);
	this.date = date || new Date();
    }

    setPoints(points) {
	this.points = points;
    }

    static parseParticipation(participation) {
	return new Participation(participation.leaderboardId, participation.playerId, participation.position, participation.player, participation._id, participation.date);
    }
}

module.exports = Participation
