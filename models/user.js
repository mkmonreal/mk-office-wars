const { ObjectId } = require('mongodb');

const Elo = require('./elo');

class User {
    constructor({ _id, name, hashedPassword, elos }) {
	this._id = _id;
	this.name = name;
	this.hashedPassword = hashedPassword;
	this.elos = elos.map(elo => new Elo(elo));
    }

    updateElo(elo) {
	this.elos.forEach(x => x.elo += x.gameId === elo.gameId ? elo.elo : 0);
    }
}

module.exports =  User;
