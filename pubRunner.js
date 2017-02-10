//const AWS    = require('aws-sdk');
const FTP    = require('./include/ftp_slave.js');
const PubSub = require('./include/lib.js');

// The directory to transfer FTP traffic from
const FTP_DIR = './upload';

// The remote host and port to publish events to
const REMOTE_HOST = 'localhost';

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
