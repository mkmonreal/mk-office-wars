const { ObjectId } = require('mongodb');
const { getClient, dbName } = require('../dbConfig');

const Game = require('../models/game');
const Participation = require('../models/participation');

const leaderboardService = require('./leaderboard');

const collection = "participations";

class PointService {
    async addPoints(id, raceResults) {
	const CLIENT = getClient();
	let now = new Date();
	let participations = [];
	let leaderboard = await leaderboardService.getLeaderboardByIdWithGame(id);
	let game = Game.parseGame(leaderboard.game[0]);
	let playersMultiplier = game.getPlayersMultiplier(raceResults.length);
	
	
	raceResults.forEach(x => {
	    x.points = x.positions.map(y => game.getPointsByPosition(y - 1));
	    x.playersMultiplier = playersMultiplier;
	    x.finalPoints = x.points.map(y => parseInt(y * playersMultiplier));

	    for(let i = 0; i < x.points.length; i++) {
		participations.push(new Participation(leaderboard._id, x.name, x.positions[i], x.points[i], x.playersMultiplier, now));
	    }
	});

	try {
	    await CLIENT.connect();
	    console.log('before insert');
	    let result = await client.db(dbName).collection(collection).insertMany(participations);
	    CLIENT.close();
	    
	    return result;
	}
	catch(err) {
	    console.error(err);
	}
	finally {
	    await CLIENT.close();
	}
    }
}

module.exports = PointService;
