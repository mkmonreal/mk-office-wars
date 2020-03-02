const { ObjectId } = require('mongodb');

const { client, dbName } = require('../dbConfig');
const leaderboardService = require('./leaderboard');

const Game = require('../models/game');

const collection = 'games';

class GameService {
    async createNewGame(name, players, points) {
	let  game = new Game(name, players, points);

	client.connect();
	let cursor = client.db(dbName).collection(collection).insertOne(game);
	cursor.catch(function (err) {
	    throw err;
	})
	let result = await cursor;
	game = result.ops[0];

	leaderboardService.createNewLeaderboard(game._id);
    }

    async getGameById(id) {
	client.connect();
	let cursor = client.db(dbName).collection(collection).findOne({ '_id': new ObjectId(id) });
	let result = await cursor;
	client.close();

	return result;
    }

    getGameByName (name) {
	client.connect(uri, async function (err, db) {
            if (err) throw err;

            db = client.db(dbName);
            await db.collection(collection).findOne({ name }, function (err, result) {
		if (err) throw err;
		
		client.close();
            });
	});
    }

    async getGames() {
	client.connect();
	let cursor = client.db(dbName).collection(collection).find({});
	let result = await cursor.toArray();
	client.close();

	return result;
    }

    async getGamesWithLeaderboard() {
	try {
	    client.connect();
	    let cursor = client.db(dbName).collection(collection).aggregate([
		{
		    $lookup:
		    {
			from: leaderboardService.leaderboardCollection,
			localField: '_id',
			foreignField: 'gameId',
			as: 'leaderboard'
		    }
		}
	    ]);
	    let result = await cursor.toArray();

	    return result;
	} catch (err) {
	    console.error(err);
	} finally {
	    client.close();
	}
    }
}

module.exports = GameService;
