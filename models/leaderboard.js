class Leaderboard {
    constructor(gameId, clasification, lastUpdate, startDate) {
	this.gameId = gameId;
	this.clasification = clasification || [];
	this.lastUpdate = lastUpdate || new Date();
	this.startDate = startDate || new Date();
    }
}

module.exports = Leaderboard;
