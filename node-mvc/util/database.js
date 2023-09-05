const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const connectMongo = (callback) => {
  MongoClient.connect(
    "mongodb+srv://prashant:Svl0FdHyAGZ0dBdd@cluster0.eobih.mongodb.net/shop?retryWrites=true&w=majority"
  )
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
