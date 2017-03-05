# TODO

+ connect to db and then insert
+ make a process to check whether there's a file and then insert the new data
into db
    + check new files
        + check every file
        + check everytime with mongodb whether there is new file
+ daemon process
    + sysmd may not be good for log
    + `forever` is not good for  
    + screen
- Ray's questions
    + which property
    + which user
    + which meter
    + how often
    + allume and narromine same
    + the database consistence and integrate
    + database scheme at https://www.draw.io/#G0Bws9uWW6A4hGaDBtSjRDbUlrMHM is not fulfilled
    + This is an entry from collection `MeterData`: `{ "_id" : "222Cg33PspSpi2HPE", "type" : "MeanPowerFactor", "value" : 0.999, "timestamp" : 1482385664000, "meterId" : "001BC502B0104B28-3" }`. However, according to the scheme, the field `meterId` is expected to refer to the id of one of the entries in `Meters`. I am guessing, here the `meterId` included is the nmi or something of the meter. This information should be kept in the `Meter` collection!
    + An entry in `Meter` looks like `{ "_id" : "5KWX7WzCqPrzvM99o", "nmi" : null, "userId" : [ ], "type" : "test", "manufacturer" : "Saturn South", "model" : "mini CT meter", "serialNumber" : "none" }` . May use `nmi` to store NMI. (edited)
    + no `propertyId` in `Meter`
        + don’t know which meter refers to which property
    - And currently we only have valid NG entires in `Properties`, but not narromine ones. Does any one have details of users? Only when having these info would it be possible for me to create accounts for them.

