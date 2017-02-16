/**
 *  Created by chris on 12/02/2017.
    This module is for updating acumen data as a scheduled task.
 */

// Meteor Atmosphere packages
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Node packages
import atob from 'atob';

// Own defined js files
import processMeterData from './process-meter-data.js';
import Acumen from "../../../api/collections/acumen.js";

// Constants
const os = require('os');
const fs = require('fs');
const Fiber = Npm.require('fibers');
const folder = os.homedir()+"/ftp-files/acumen/";

// Body
export default () => {
    // get all files
    fs.readdirSync(folder, (err, files) => {
        files.forEach(file => {
            //if not existing in mongodb
            var query_result = null;
            Fiber(function(){
                query_result = Acumen.findOne({
                    name: file
                });
            }).run();
            if ( query_result == null ){
                // console.log("Processing new file: "+file);

                fs.readFile(folder+file, 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    let rows = atob(data).split("\r\n");
                    processMeterData(rows);
                });

                Fiber(function () {
                    Acumen.insert({name: file}, function(error) {
                        if(error)
                            console.log(error);
                    });
                }).run();
                // console.log("Marked the files as proceeded: "+file);
                // console.log("Finished processing "+file);
            }
        });
    });   
}

