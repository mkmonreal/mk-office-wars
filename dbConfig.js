const { MongoClient } = require('mongodb');
const dbName = "mk-office-wars";
const url = 'mongodb://172.17.0.2:27017/';
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
