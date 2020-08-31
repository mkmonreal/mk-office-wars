const { ObjectId } = require('mongodb');

class User {
    constructor({ _id, name, hashedPassword, elo }) {
	this._id = _id;
	this.name = name;
	this.hashedPassword = hashedPassword;
	this.elo = elo || 1400;
    } 
}

module.exports =  User;
