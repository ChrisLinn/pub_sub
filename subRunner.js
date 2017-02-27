const os = require('os');
const PubSub = require('./include/lib.js');
const mkdirp = require('mkdirp');
const fs = require('fs');
const Db = require('./include/db.js');
const DataProcessor = require('./include/dataprocessor.js');
const db_url = 'mongodb://chris:1211@ds056979.mlab.com:56979/whatname';

// The remote host and port to publish events to
var REMOTE_HOST = 'localhost';
var save_to_path =  os.homedir()+"/ftp-download/acumen/";
console.log('1.remote or 2.local?\n\'1\' or \'2\':');
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
    if (text === '1\n') {
        REMOTE_HOST = '54.206.70.218';
        FTP_DIR = os.homedir()+"/../ftpusers/acumen/metering";
        console.log('REMOTE_HOST set to 54.206.70.218.\n');
    }
    
    const subber = new PubSub.Subscriber(REMOTE_HOST, process);

    subber.connect();
});


function process(label, data) {

    //console.log('Unzipped data:\n'+data);
    var filename = label.split("/");
    mkdirp(save_to_path);
    fs.writeFileSync(save_to_path+filename[filename.length-1], data);
    console.log("The file was saved!\n\n\n");

    //insert the data into db
    fs.readFile(save_to_path+filename[filename.length-1], 'utf8', function (err,data) {
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
}