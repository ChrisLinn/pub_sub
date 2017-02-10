const FTP = require('./include/ftp_slave.js');
const PubSub = require('./include/lib.js');

// The remote host and port to publish events to
const REMOTE_HOST = 'localhost';

// const subber = new PubSub.Subscriber(REMOTE_HOST, (label, data) => {
//     process(data);
// });

const subber = new PubSub.Subscriber(REMOTE_HOST, process);

function process(label, data) {
    // body...
    console.log('Unzipped data:\n'+data);   
}

subber.connect();
