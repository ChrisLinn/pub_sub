const Net = require('net');
const Com = require('./common.js');

class Nexus
{
    constructor(port=Com.NEXUS_SERVER_PORT)
    {
        this.port   = port;
        this.subs   = [];
        this.server = null;
    }

    start()
    {
        this.server = Net.createServer((conn) => {
            console.log('\nNew connection');

            conn.on('data', (data) => {
                let msg = JSON.parse(data.toString('utf8'));

                switch (msg.type) {
                    case Com.MsgType.Sub:
                        console.log('New subscription');
                        this.addSubscription(conn.remoteAddress, msg.port);
                        break;
                    case Com.MsgType.UnSub:
                        console.log('Removing subscription');
                        this.removeSubscription(conn);
                        break;
                    case Com.MsgType.Pub:
                        console.log('Publishing data');
                        this.publish(msg);
                        break;
                    default:
                        console.log('Unrecognised message:', msg);
                }
            });
        });

        this.server.listen(this.port, () => {
            console.log('Nexus listening');
        });
    }

    addSubscription(host, port)
    {
        let entry = {
            'host': host,
            'port': port
        };

        this.subs.push(entry);

        console.log('New subscription:', entry);
    }

    removeSubscription(sock)
    {
        this.subs = this.subs.filter((elt, i, arr) => {
            return elt.addr !== this.sock.remoteAddress && elt.port !== socket.remotePort;
        });

        console.log('Removed subscription:', {
            host: this.sock.remoteAddress,
            port: this.sock.remotePort
        });
    }

    publish(msg)
    {
        this.subs.map((entry) => {
            const remote = Net.createConnection(entry, () => {
                remote.write(JSON.stringify(msg));
            });
        });
    }
}

module.exports.Nexus = Nexus;
