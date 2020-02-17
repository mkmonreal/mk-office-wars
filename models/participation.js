const { ObjectId } = require('mongodb');

class Participation {
    constructor(leaderboardId, playerId, position, points, playersMultiplier, date, id) {
	this.leaderboardId = leaderboardId;
	this.playerId = playerId;
	this.position = position;
	this.points = points || 0;
	this.playersMultiplier = playersMultiplier || 0;
	this.date = date || new Date();
	this._id = new ObjectId(id);
    }

    setPoints(points) {
	this.points = points;
    }

    static parseParticipation(participation) {
	return new Participation(participation.leaderboardId, participation.playerId, participation.position, participation.player, participation._id, participation.date);
    }
}

module.exports = Participation
