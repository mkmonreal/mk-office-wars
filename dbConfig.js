const { MongoClient } = require('mongodb');
const dbName = 'mk-office-wars';
const url = 'mongodb://localhost:27017/';
const options = {
  useUnifiedTopology: true
};

const client = new MongoClient(url, options);

module.exports = {
    client,
    dbName
};
