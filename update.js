/**
 *  Created by chris on 12/02/2017.
    This module is for updating acumen data as a scheduled task.
 */

// Meteor Atmosphere packages
// import {Meteor} from 'meteor/meteor';
// import {Mongo} from 'meteor/mongo';

// Node packages

// Own defined js files
// import Acumen from "../../../api/collections/acumen.js";

// Constants
const atob = require('atob');
const os = require('os');
const fs = require('fs');
const Db = require('./db.js');
const DataProcessor = require('./dataprocessor.js');
// const Fiber = Npm.require('fibers');
const folder = os.homedir()+"/ftp-files/acumen/";


// get all files
files = fs.readdirSync(folder);

files.forEach(file => {
    // console.log(file);

    new Db().init((db) =>
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
                            new DataProcessor().process(rows);
                        });

                        new Db().init((db) =>{
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
