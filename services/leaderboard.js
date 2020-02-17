const { ObjectId } = require('mongodb');
const { getClient, dbName } = require('../dbConfig');

const Leaderboard = require('../models/leaderboard');

const gameService = require('./game');

const collection = 'leaderboards';

var db;

let createNewLeaderboard = function (gameId) {
    let leaderboard = new Leaderboard(gameId);
    let client = getClient();
    
    client.connect(async function (err) {
        if (err) throw err;

        await client.db(dbName).collection(collection).insertOne(leaderboard, function (err, result) {
            if (err) throw err;

            client.close();
        })
    });
};

let getLeaderboards = async function () {
    try {
	await client.connect();
	let cursor = client.db(dbName).collection(collection).find({});
	let result = await cursor.toArray();
	client.close();
	return result;
    }
    catch (err) {
	console.error(err);
    }
    finally {
	client.close();
    }
};

let  getLeaderboardById = async function (id) {
    let client = getClient();
    try {
	await client.connect();
	let cursor = client.db(dbName).collection(collection).findOne({ '_id': new ObjectId(id) });
	let result = await cursor;
	client.close();

	return result;
    }
    catch(err) {
	console.error(err);
    }
};

let getLeaderboardByIdWithGame = async function (id) {
    const client = getClient();
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
    client.close();
    
    return result[0];
};

let getLeaderboardByGameId = async function (gameId) {
    client.connect();
    let cursor = client.db(dbName).collection(collection).findOne({ gameId: new ObjectId(gameId) });
    let result = await cursor;
    client.close();
    
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
