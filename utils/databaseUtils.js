const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const url = 'mongodb+srv://root:root@mycluster.k35qqsd.mongodb.net/?appName=Mycluster';

let _db; 

const mongoConnect = (callback) => {
  MongoClient.connect(url)
    .then((client) => {
      _db = client.db();      
      callback();
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB', err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error('No database found');
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;