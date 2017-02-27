/**
 *  Created by chris on 12/02/2017.
 */

//const
const atob = require('atob');
const os = require('os');
const fs = require('fs');
const Db = require('./include/db.js');
const DataProcessor = require('./lib/dataprocessor.js');
const folder = os.homedir()+"/ftp-files/acumen/";
const db_url = 'mongodb://chris:1211@ds056979.mlab.com:56979/whatname';


// body
// get all files
files = fs.readdirSync(folder);

files.forEach(file => {
    new Db(db_url).init((db) =>
        {
            var files = db.collection("ftp-files");
            files.findOne({
                    name: file
                }).then((result) => {
                    //if not existing in mongodb
                    if(result == null){
                        console.log("processing "+file);
                        fs.readFile(folder+file, 'utf8', function (err,data) {
                            if (err) {
                                return console.log(err);
                            }
                            // let rows = atob(data).split("\r\n");
                            let rows = data.split("\r\n");
                            new DataProcessor(db_url).process(rows);
                        });

                        new Db(db_url).init((db) =>{
                            var files = db.collection("ftp-files");
                            files.insert({name: file}, (error) => {
                                if(error)
                                    console.log(error);
                            });
                            db.close();
                        });
                    } else{
                        console.log(file + " already processed!");
                    };
                });
            db.close();
        });
});
