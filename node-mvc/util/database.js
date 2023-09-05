const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const connectMongo = (callback) => {
  MongoClient.connect("")
    .then((result) => {
      console.log("DB Connected");
      _db = result.db();
      callback();
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database";
};

module.exports = connectMongo;
module.exports = getDb;
