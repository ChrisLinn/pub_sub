const os = require('os');
const PubSub = require('./include/lib.js');
const mkdirp = require('mkdirp');
const fs = require('fs');
const util = require('util');

// The remote host and port to publish events to
const REMOTE_HOST = 'localhost';
const save_to_path =  os.homedir()+"/ftp-download/acumen/";
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
console.log('1.remote or 2.local?:\n\'1\' or \'2\'', util.inspect(text));
if (text === '1\n') {
    REMOTE_HOST = '54.206.70.218';
    console.log('REMOTE_HOST set to 54.206.70.218.');
}
});

const subber = new PubSub.Subscriber(REMOTE_HOST, process);
function process(label, data) {

    //console.log('Unzipped data:\n'+data);
    var filename = label.split("/");
    mkdirp(save_to_path);
    fs.writeFileSync(save_to_path+filename[filename.length-1], data);
    console.log("The file was saved!\n\n\n");
}

subber.connect();
