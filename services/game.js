const { ObjectId } = require('mongodb');

const { client, dbName } = require('../dbConfig');
const leaderboardService = require('./leaderboard');

const Game = require('../models/game');

const collection = 'games';

let createNewGame = async  function (name, players, points) {
    let  game = new Game(name, players, points);

    client.connect();
    let cursor = client.db(dbName).collection(collection).insertOne(game);
    cursor.catch(function (err) {
	throw err;
    })
    let result = await cursor;
    game = result.ops[0];

    leaderboardService.createNewLeaderboard(game._id);
};

let getGameById = async function (id) {
    client.connect();
    let cursor = client.db(dbName).collection(collection).findOne({ '_id': new ObjectId(id) });
    let result = await cursor;
    client.close();

    return result;
};

let getGameByName = function (name) {
    client.connect(uri, async function (err, db) {
        if (err) throw err;

        db = client.db(dbName);
        await db.collection(collection).findOne({ name }, function (err, result) {
            if (err) throw err;
            
            client.close();
        });
    });
};

let getGames = async function () {
    client.connect();
    let cursor = client.db(dbName).collection(collection).find({});
    let result = await cursor.toArray();
    client.close();

    return result;
};

let getGamesWithLeaderboard = async function () {
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
};

module.exports = {
    gameCollection: collection,
    createNewGame,
    getGameById,
    getGameByName,
    getGames,
    getGamesWithLeaderboard
};
