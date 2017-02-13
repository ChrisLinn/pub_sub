const os = require('os');
const PubSub = require('./include/lib.js');

// The remote host and port to publish events to
const REMOTE_HOST = '54.206.70.218';

// const subber = new PubSub.Subscriber(REMOTE_HOST, (label, data) => {
//     process(data);
// });

const subber = new PubSub.Subscriber(REMOTE_HOST, process);

function process(label, data) {

    //console.log('Unzipped data:\n'+data);

    var mkdirp = require('mkdirp');
    var fs = require('fs');

    var filename = label.split("/");
    var save_to_path =  os.homedir()+"/ftp-files/acumen/";
    fs.writeFile(save_to_path+filename[filename.length-1], data, function(err) {
        if(err) {
            // console.log(err);
            console.log("\n\nTrying to create the directory.");
            mkdirp(save_to_path);
            process(label,data);
            return;
        }
        console.log("The file was saved!\n\n\n");
    });
}

subber.connect();
