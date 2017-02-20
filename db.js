var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://chris:1211@ds056979.mlab.com:56979/whatname';

class Db{

    init(cb){
        // body...
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            // console.log("Connected successfully to server");
            return cb(db);
        }); 
    }

}
module.exports = Db;
