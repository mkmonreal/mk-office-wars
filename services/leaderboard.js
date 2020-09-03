const { ObjectId } = require('mongodb');
const { getClient, dbName } = require('../dbConfig');

const Leaderboard = require('../models/leaderboard');

const GameService = require('./game');
const userService = require('./user');

const collection = 'leaderboards';

class LeaderboardService {
    static async createLeaderboard(name, playersPerGame, pointsByPosition) {
	const client = getClient();
	try {
	    const game = await GameService.createGame(name, playersPerGame, pointsByPosition);
	    let leaderboard = new Leaderboard({ gameId: game._id });
	    await client.connect();
	    const cursor = client.db(dbName).collection(collection).insertOne(leaderboard);
	    const result = await cursor;
	    leaderboard = new Leaderboard(result.ops[0]);
	    client.close();
	    return leaderboard;
	}
	catch (err) {
	    console.error(err);
	    if (client) {
		client.close();
	    }
	}
    }
    
    static async getLeaderboardById(_id) {
	try {
	    const client = getClient();
	    const cursor = client.db(dbName).collection(collection).findOne({ _id });
	    const result = await cursor;
	    client.close();
	    return result;
	}
	catch (err) {
	    client.close();
	    console.error(err);
	}
    }

    static async updateLeaderboard(leaderboard) {
	try {
	    const client = getClient();
	    const query = { _id: leaderboard._id };
	    const cursor = client.db(dbName).collection(collection).updateOne(query, leaderboard);
	    const result = await cursor;
	    client.close();
	    return result;
	}
	catch (err) {
	    client.close();
	    console.error(err);
	}
    }

    static async updateElo(_id, raceResults) {
	try {
	    const leaderboard = await getLeaderboardById(_id);
	    const game = await gameService.getGameById(leaderboard.gameId);
	    const nPlayers = raceResults.length;
	    const nPlayersMultiplier = game.getPlayersMultiplier(nPlayers);
	    const userIds = raceResults.map(result => result._id);
	    const users = await userService.getUsersById(userIds);
	    raceResults.forEach(raceResult => raceResult.points = game.getPointsByPosition(raceResult.position));
	    users.forEach(user => {
		const opponents = users.filter(x => x._id !== user._id);
		const elo = user.getEloByGameId(game._id);
		const earnings = elo.calculateEarnings(raceResults.find(x => user._id).points,
						       nPlayersMultiplier,
						       nPlayers,
						       opponentElos,
						       game.getPointsByPosition(1));
		elo.addEarnings(earnings);
		user.updateElo(elo);
		leaderboard.clasification.forEach(x => x.elo += x.userId === user._id ? earnings : 0);
	    });
	    updateLeaderboard(leaderboard);
	    userService.updateUsers(users);
	}
	catch (err) {
	    client.close();
	    console. error(err);
	}
    }
}

module.exports = LeaderboardService;

