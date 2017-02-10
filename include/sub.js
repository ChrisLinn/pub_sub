const Net = require('net');
const Com = require('./common.js');

class Subscriber
{
    constructor(nexusHost, action,
            nexusPort=Com.NEXUS_SERVER_PORT, listenPort=Com.SUB_SERVER_PORT)
    {
        this.config = {
            host: nexusHost,
            port: nexusPort
        };

        this.action = action;

        this.port = listenPort;
        this.server = null;
    }

    /**
     * Connect and subscribe to the pubsub nexus, which will send published
     * information to all subscribers such as this one
     */
    connect()
    {
        // Create a new service to listen for publications
        this.server = Net.createServer((conn) => {
            console.log('Receiving data.\n');

            // When data is received, parse it and call the associated action
            conn.on('data', (incoming) => {
                let msg = JSON.parse(incoming.toString('utf8'));

                if (!msg) {
                    console.error('Received message was null');
                    return;
                }

                if (!msg.hasOwnProperty('type')) {
                    console.error('Received message had no type');
                    return;
                }

                if (!(msg.type === Com.MsgType.Pub)) {
                    console.error('Received message was not a pub message');
                    return;
                }

                console.log('Label:\n'+msg.label);
                console.log('Received data:\n'+msg.data.toString());
                let data = Com.deserialiseData(msg.data);
                // console.log('Unzipped data:\n:', data.toString());
                this.action(msg.label, data.toString());
            });
        });

        // Start the created service listening
        this.server.listen(Com.SUB_SERVER_PORT, () => {
            console.log('Subsriber server listening');
        });

        const remote = Net.createConnection(this.config, () => {
            remote.write(new Com.SubMsg().toString());
            console.log('Subscribed');
        });
    }
}

module.exports.Subscriber = Subscriber;
