/**
 * Created by ra on 5/07/2016.
 */
// Meteor Atmosphere packages
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Node packages

// Own defined js files
import common from "../functions/common.js";
import CustomerAccounts from "./customer-accounts.js";
import Meters from "./meters.js";
import Properties from "./properties.js";


// Constants
const MeterData = new Mongo.Collection('MeterData');
const meterTypes = {
    solarToProperty: "solarToProperty",
    solarConsumption: "solarConsumption",
    solarExported: "solarExported",
    solarProduction: "solarProduction",
    gridConsumption: "gridConsumption"
};

export default MeterData;
export { meterTypes };

// These are for clients
MeterData.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});


if (Meteor.isServer) {
    Meteor.publish('MeterData', function () {

        if (!this.userId) {
            return this.ready();
        } else if (common.isAdmin()) {
            return MeterData.find({});
        } else {

            const account = CustomerAccounts.findOne({ userId: this.userId });

            if(!account) {
                return this.ready();
            }

            const meterIds = Meters.find({ propertyCode: { $in: account.propertyIds } }).map(function () {
                return this.meterCode;
            });

            return MeterData.find({ meterId: { $in: meterIds } });
        }
    });
}
