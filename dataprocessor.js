/**
 * Created by ra on 13/07/2016.
 */
// Meteor Atmosphere packages

// Node packages

// Own defined js files
// import ProductionData from "../../../api/collections/meter-data.js";
const Db = require('./db.js');

// Constants
const REAL_POWER_CONSUMPTION = 'E';
const REAL_POWER_PRODUCTION = 'B';

const nem12 = {
    recordIndicator: 0,
    "100": {
        versionHeader: 1
    },
    "200": {
        nmi: 1,
        nmiSuffix: 4,
        meterSerialNumber: 6,
        unit: 7,
        intervalLength: 8
    },
    "300": {
        date: 1
    }
};

class DataProcessor{

    process (rows,callback) {
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i].split(",");
            let recordIndicator = parseInt(row[0]);

            // Define here to provide local scope to the callback defined below
            let document = {};

            switch(recordIndicator) {
                case 100:
                    if (row[nem12["100"].versionHeader] !== 'NEM12') {
                        return console.error(new Error("Data not in NEM12 format."))
                    }
                    break;

                case 200:
                    let nmiSuffix = row[nem12["200"].nmiSuffix];
                    let type = '';
                    // Modify here if we need to monitor more types of data
                    if (nmiSuffix.indexOf(REAL_POWER_CONSUMPTION) > -1) {
                        type = "consumption";
                    } else if (nmiSuffix.indexOf(REAL_POWER_PRODUCTION) > -1) {
                        type = "production";
                    } else {
                        break;
                    }

                    document.type = type;
                    document.nmi = row[nem12["200"].nmi];
                    document.meterSerialNumber = row[nem12["200"].meterSerialNumber];
                    if (row[nem12["200"].unit] !== "kWh") {
                        document.unit = row[nem12["200"].unit];
                    }

                    let interval = row[nem12["200"].intervalLength];

                    // Assumes only one 300 row exists for each 200 row - needs generalisation potentially
                    i += 1;
                    let nextRow = rows[i].split(",");
                    document.date = new Date(
                        parseInt(nextRow[nem12["300"].date].slice(0,4)),
                        parseInt(nextRow[nem12["300"].date].slice(4,6)) - 1,
                        parseInt(nextRow[nem12["300"].date].slice(6,8))
                    );

                    let sum = 0;
                    let numOfSamples = 1440/interval;
                    for (let i = 2; i < 2 + numOfSamples; i++) {
                        sum += parseFloat(nextRow[i]);
                    }

                    document.data = sum;

                    let lastUpdated = 5 + numOfSamples;
                    document.lastUpdated = new Date(
                        parseInt(nextRow[lastUpdated].slice(0,4)),
                        parseInt(nextRow[lastUpdated].slice(4,6)) - 1,
                        parseInt(nextRow[lastUpdated].slice(6,8)),
                        parseInt(nextRow[lastUpdated].slice(8,10)),
                        parseInt(nextRow[lastUpdated].slice(10,12))
                    );

                    let cond = {};
                    Object.assign(cond, document);
                    delete cond.lastUpdated;
                    delete cond.data;
                    delete cond.unit;

                    // function cb(err, res) {
                    //     if (err) return console.error(err);
                    // }

                    new Db().init((db) =>
                    {
                        var meterData = db.collection("MeterData");
                        meterData.update(
                            cond,
                            document,
                            {upsert: true}
                        );
                        db.close();
                    });
            }
        }
    }
}

module.exports = DataProcessor;

