const Net  = require('net');
const ZLib = require('zlib');

const Com = require('./common.js');

class Publisher
{
    constructor(remoteHost, remotePort=Com.NEXUS_SERVER_PORT)
    {
        this.config = {
            host: remoteHost,
            port: remotePort
        };
    }

    /**
     * Send data to subscribed listeners
     */
    push(data, label)
    {
        // Open a new connection
        let remote = Net.createConnection(this.config, () => {
            console.log('Pushing:\n'+label);
            // Compress the data to be sent
            let zipped = Com.serialiseData(data);
            // Send data
            remote.write(new Com.PubMsg(zipped, label).toString());
            console.log('Sent:\n'+zipped.toString());
        });
    }
}

module.exports.Publisher = Publisher;
