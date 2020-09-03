const { MongoClient } = require('mongodb');
const dbName = "mk-office-wars";
const url = 'mongodb://localhost:27017/';
const options = {
  useUnifiedTopology: true
};

const getClient = function () {
    return new MongoClient(url, options);
};

module.exports = {
    getClient,
    dbName
};
