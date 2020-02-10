const { ObjectId } = require('mongodb');

class Player {
    constructor(name, nickname, id, creationDate) {
	this.name = name;
	this.nickname = name;
	this._id = new ObjectId(id);
	this.creationDate = creationDate || new Date();
    }

    static parsePlayer(player) {
	return new Player(player.name, player.nickname, player._id, player.creationDate);
    }
}

module.exports = Player;
