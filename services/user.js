
const { ObjectId } = require('mongodb');
const { getClient, dbName } = require('../dbConfig');

const collection = 'users'

class UserService {
    static async createUser(name, hashedPassword) {
	try {
	    let user = new User({ name, hashedPassword });
	    const client = getClient();
	    const cursor = client.db(dbName).collection(collection).insertOne(user);
	    user = await cursor;
	    client.close();
	    return user;
	}
	catch (err) {
	    client.close();
	    console.error(err);
	}
    }
    
    static async getUserById(_id) {
	try {
	    const client = getClient();
	    const cursor = client.db(dbName).collection(collection).findOne({ _id });
	    const result = await cursor;
	}
	catch (err) {
	    client.close();
	    console.error(err);
	}
    }

    static async getUsersById(_id) {
	try {
	    const client = getClient();
	    const cursor = client.db(dbName).collection(collection).find({ _id: { $in: _id } });
	    const users = await cursor.toArray();
	    client.close();
	    return users;
	}
	catch (err) {
	    client.close();
	    console.error(err);
	}
    }

    static async updateUsers(users) {
	try {
	    const cursors = [];
	    const client = getClient();
	    for (const user of users) {
		const query = { _id: user._id };
		cursors.push(client.db(dbName).collection(collection).findAndUpdate(query, user));
	    }
	    const reuslts = await Promise.all(cursors);
	    client.close();
	    console.log(results);
	}
	catch (err) {
	    client.close();
	    console.error(err);
	}
    }
}

module.exports = UserService;
