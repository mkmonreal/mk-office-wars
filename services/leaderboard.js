const { ObjectId } = require('mongodb');
const { client, dbName } = require('../dbConfig');

const Leaderboard = require('../models/leaderboard');

const gameService = require('./game');

const collection = 'leaderboards';

var db;

let createNewLeaderboard = function (gameId) {
    let leaderboard = new Leaderboard(gameId);

    client.connect(async function (err) {
        if (err) throw err;

        db = client.db(dbName);
        await db.collection(collection).insertOne(leaderboard, function (err, result) {
            if (err) throw err;

            client.close();
        })
    });
};

let getLeaderboards = async function () {
    client.connect();
    let cursor = client.db(dbName).collection(collection).find({});
    let result = await cursor.toArray();
    client.close();
    
    return result;
};

let  getLeaderboardById = async function (id) {
    client.connect();
    let cursor = client.db(dbName).collection(collection).findOne({ '_id': new ObjectId(id) });
    let result = await cursor;
    client.close();

    return result;
};

let getLeaderboardByIdWithGame = async function (id) {
    client.connect();
    let cursor = client.db(dbName).collection(collection).aggregate([
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
    let result = await cursor.toArray();
    return result[0];
};

let getLeaderboardByGameId = async function (gameId) {
    client.connect();
    let cursor = client.db(dbName).collection(collection).findOne({ gameId: new ObjectId(gameId) });
    let result = await cursor;
    client.close();

    console.log(result);
    return result;
};

module.exports = {
    leaderboardCollection: collection,
    createNewLeaderboard,
    getLeaderboards,
    getLeaderboardById,
    getLeaderboardByIdWithGame,
    getLeaderboardByGameId
};
