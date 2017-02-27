//const AWS    = require('aws-sdk');
const FTP    = require('./include/ftp_slave.js');
const PubSub = require('./include/lib.js');
const os = require('os');

// The directory to transfer FTP traffic from
// const FTP_DIR = os.homedir()+"/../ftpusers/acumen/metering";

// The remote host and port to publish events to
var REMOTE_HOST = 'localhost';
var FTP_DIR = os.homedir()+"/ftp-files/acumen";
console.log('1.remote or 2.local?\n\'1\' or \'2\':');
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
    if (text === '1\n') {
        REMOTE_HOST = '54.206.70.218';
        FTP_DIR = os.homedir()+"/../ftpusers/acumen/metering";
        console.log('REMOTE_HOST set to 54.206.70.218.\n');
    }

    //// The S3 bucket to use
    //const NMI_BUCKET = 'ftp-nmi-data';

    // Create a new context for listening to FTP events
    const ftpListener = new FTP.Listener(FTP_DIR);

    // Create a context for publishing data to the given pubsub server
    const publisher = new PubSub.Publisher(REMOTE_HOST);

    ftpListener.addHook((data, label) => {
        publisher.push(data.toString(), label.toString());
    });

    // ftpListener.addHook((data, label) => {
    //     console.log('Uploading to S3:', label);

    //     let s3params = {
    //         Bucket: NMI_BUCKET,
    //         Key:    label
    //     };

    //     let body
    // });
    ftpListener.start();
    console.log('Start keeping eyes on the folder');
});
