const ZLib = require('zlib');

const NEXUS_SERVER_PORT = 7727;
const SUB_SERVER_PORT = 7728;

const MsgType = {
    Sub: 'sub',
    UnSub: 'unsub',
    Pub: 'pub'
};
Object.freeze(MsgType);

class Msg
{
    constructor(type)
    {
        this.type = type;
    }

    toString()
    {
        return JSON.stringify(this);
    }
}

class SubMsg extends Msg
{
    constructor(port=SUB_SERVER_PORT)
    {
        super(MsgType.Sub);
        this.port = port;
    }
}

class UnSubMsg extends Msg
{
    constructor()
    {
        super(MsgType.UnSub);
    }
}

class PubMsg extends Msg
{
    constructor(data, label)
    {
        super(MsgType.Pub);
        this.data = data;
        this.label = label
    }
}

function serialiseData(data)
{
    return ZLib.deflateSync(data.toString('base64'));
}

function deserialiseData(dataStr)
{
    return ZLib.inflateSync(Buffer.from(dataStr, 'base64'))
}

module.exports.MsgType  = MsgType;
module.exports.SubMsg   = SubMsg;
module.exports.UnSubMsg = UnSubMsg;
module.exports.PubMsg   = PubMsg;
module.exports.deserialiseData = deserialiseData;
module.exports.serialiseData = serialiseData;
module.exports.SUB_SERVER_PORT = SUB_SERVER_PORT;
module.exports.NEXUS_SERVER_PORT = NEXUS_SERVER_PORT;
