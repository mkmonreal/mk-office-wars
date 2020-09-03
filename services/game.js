const { ObjectId } = require('mongodb');

const { getClient, dbName } = require('../dbConfig');

const Game = require('../models/game');

const collection = 'games';

class GameService {
    static async createGame(name, playersPerGame, pointsByPosition) {
	const client = getClient();
	try {
	    await client.connect();
 	    let game = new Game({ name, playersPerGame, pointsByPosition });
	    const cursor = client.db(dbName).collection(collection).insertOne(game);
	    const result = await cursor;
	    client.close();
	    game = new Game(result.ops[0]);
	    return game;
	}
	catch (err) {
	    console.error(err);
	    if (client) {
		client.close();
	    }
	}
    }

    async getGames() {
	try {
	    const client = getClient();
	    client.connect();
	    let cursor = client.db(dbName).collection(collection).find({});
	    let result = await cursor.map(game => new Game(game));
	    client.close();

	    return result;
	}
	catch (err){
	    console.error(err);
	    client.close();
	}

    }

    async getGameById(id) {
	try {
	    const client = getClient();
	    let cursor = client.db(dbName).collection(collection).findOne({ '_id': new ObjectId(id) });
	    let result = new Game(await cursor);
	    client.close();
	    return result;
	}
	catch (err) {
	    client.close();
	    console.error(err);
	}
    }
}

module.exports = GameService;
