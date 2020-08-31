const { ObjectId } = require('mongodb');
const { getClient, dbName } = require('../dbConfig');

const Leaderboard = require('../models/leaderboard');

const gameService = require('./game');
const userService = require('./user');

const collection = 'leaderboards';

class LeaderboardService {
    static async createLeaderboard(game) {
	try {
	    let leaderboard = new Leaderboard({ gameId: _id });
	    const client = getClient();
	    const cursor = client.db(dbName).collection(collection).insertOne(leaderboard);
	    leaderboard = await cursor;
	    client.close();
	    return leaderboard;
	}
	catch (err) {
	    client.close();
	    console.error(err)
	}
    }
    
    static async getLeaderboardById(_id) {
	try {
	    const client = getClient();
	    const cursor = client.db(dbName).collection(collection).findOne({_id});
	    const result = await cursor;
	    client.close();
	    return result;
	}
	catch (err) {
	    client.close();
	    console.error(err);
	}
    }

    static async updateLeaderboard(_id, raceResults) {
	
    }
}

module.exports = LeaderboardService;

