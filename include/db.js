const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class Db{

    constructor(url){
        this.url = url;
    }

    init(cb){
        // body...
        // Use connect method to connect to the server
        MongoClient.connect(this.url, function(err, db) {
            assert.equal(null, err);
            // console.log("Connected successfully to server");
            return cb(db);
        }); 
    }

}
module.exports = Db;
