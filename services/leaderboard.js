const { ObjectId } = require('mongodb');
const { getClient, dbName } = require('../dbConfig');

const Leaderboard = require('../models/leaderboard');

const gameService = require('./game');

const collection = 'leaderboards';

var db;

class LeaderboardService {

    newfunction() {
	console.log("Funcion reconocida");
    }
    
    static async getLeaderboards() {
	const CLIENT = getClient();
	try {
	    await CLIENT.connect();
	    let cursor = CLIENT.db(dbName).collection(collection).find({});
	    let result = await cursor.toArray();
	    CLIENT.close();
	    return result;
	}
	catch (err) {
	    console.error(err);
	}
	finally {
	    CLIENT.close();
	}
    }

    createNewLeaderboard(gameId) {
	let leaderboard = new Leaderboard(gameId);
	let client = getClient();
	
	client.connect(async function (err) {
            if (err) throw err;

            await client.db(dbName).collection(collection).insertOne(leaderboard, function (err, result) {
		if (err) throw err;

		client.close();
            })
	});
    }

    static async getLeaderboardById(id) {
	let client = getClient();
	try {
	    await client.connect();
	    let cursor = client.db(dbName).collection(collection).findOne({ '_id': new ObjectId(id) });
	    let result = await cursor;
	    client.close();

	    return result;
	} catch(err) {
	    console.error(err);
	} finally {
	    client.close();
	}
    }

    static async getLeaderboardsWithGames() {
	const CLIENT = getClient();
	try {
	    await CLIENT.connect();
	    let cursor = CLIENT.db(dbName).collection(collection).aggregate([
		{
		    $lookup:
		    {
			from: 'games',
			localField: 'gameId',
			foreignField: '_id',
			as: 'games'
		    }
		}
	    ]);
	    let result = await cursor.toArray();
	    CLIENT.close();
	    
	    return result;
	} catch(err) {
	    console.error(err);
	} finally {
	    CLIENT.close();
	}
    }

    static async getLeaderboardByIdWithGame(id) {
	let result, cursor;
	let client = getClient();
	try {
	    await client.connect();
	    cursor = client.db(dbName).collection(collection).aggregate([
		{
		    $match:
		    {
			'_id': new ObjectId(id)
		    }
		},
		{
		    $lookup:
		    {
			from: 'games',
			localField: 'gameId',
			foreignField: '_id',
			as: 'game'
		    }
		}
	    ]);
	    result = await cursor.toArray();
	    client.close();
	    
	    return result[0];
	} catch(err) {
	    console.error(err);
	} finally {
	    client.close();
	}
    }

    static async getLeaderboardByGameId(gameId) {
	let client = getClient();
	try {
	    await client.connect();
	    let cursor = client.db(dbName).collection(collection).findOne({ gameId: new ObjectId(gameId) });
	    let result = await cursor;
	    client.close();
	    
	    return result;
	} catch(err) {
	    console.error(err);
	} finally {
	    client.close();
	}
    }
}

let getLeaderboardByIdWithGame = async function (id) {

};

let getLeaderboardByGameId = async function (gameId) {
    
};

module.exports = LeaderboardService;
