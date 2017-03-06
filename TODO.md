# TODO

+ NEM standard
+ B3 all 0s
+ E2
    * ./nem12_acumemdp_allume_ene_t0002475453.csv
    * ./nem12_acumemdp_allume_ene_t0002473099.csv
    * ./nem12_acumemdp_allume_ene_t0002548900.csv
    * ./nem12_acumemdp_allume_ene_t0002543996.csv
    * ./nem12_acumemdp_allume_ene_t0002530286.csv
    * ./nem12_acumemdp_allume_ene_t0002502750.csv
    * ./nem12_acumemdp_allume_ene_t0002488764.csv
    * ./nem12_acumemdp_allume_ene_t0002494729.csv
    * ./nem12_acumemdp_allume_ene_t0002582081.csv
    * ./nem12_acumemdp_allume_ene_t0002515677.csv
    * ./nem12_acumemdp_allume_ene_t0002479159.csv
    * ./nem12_acumemdp_allume_ene_t0002483802.csv
    * ./nem12_acumemdp_allume_ene_t0002533707.csv
    * ./nem12_acumemdp_allume_ene_t0002552236.csv
    * ./nem12_acumemdp_allume_ene_t0002536259.csv
    * ./nem12_acumemdp_allume_ene_t0002505920.csv
    * ./nem12_acumemdp_allume_ene_t0002554071.csv
    * ./nem12_acumemdp_allume_ene_t0002566784.csv
    * ./nem12_acumemdp_allume_ene_t0002560438.csv
    * ./nem12_acumemdp_allume_ene_t0002566878.csv
    * ./nem12_acumemdp_allume_ene_t0002534476.csv
    * ./nem12_acumemdp_allume_ene_t0002537239.csv
    * ./nem12_acumemdp_allume_ene_t0002525035.csv
    * ./nem12_acumemdp_allume_ene_t0002538700.csv
    * ./nem12_acumemdp_allume_ene_t0002475588.csv
    * ./nem12_acumemdp_allume_ene_t0002545489.csv
    * ./nem12_acumemdp_allume_ene_t0002519804.csv
    * ./nem12_acumemdp_allume_ene_t0002559169.csv
    * ./nem12_acumemdp_allume_ene_t0002557281.csv
    * ./nem12_acumemdp_allume_ene_t0002478101.csv
    * ./nem12_acumemdp_allume_ene_t0002550852.csv
    * ./nem12_acumemdp_allume_ene_t0002513297.csv
    * ./nem12_acumemdp_allume_ene_t0002510786.csv
    * ./nem12_acumemdp_allume_ene_t0002510753.csv
    * ./nem12_acumemdp_allume_ene_t0002566054.csv
    * ./nem12_acumemdp_allume_ene_t0002561874.csv
    * ./nem12_acumemdp_allume_ene_t0002505239.csv
    * ./nem12_acumemdp_allume_ene_t0002500449.csv
    * ./nem12_acumemdp_allume_ene_t0002509509.csv
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
    - dAnd currently we only have valid NG entires in `Properties`, but not narromine ones. Does any one have details of users? Only when having these info would it be possible for me to create accounts for them.

