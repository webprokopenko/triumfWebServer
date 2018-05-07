if(!global.appRoot) {
    const path = require('path');
    global.appRoot = path.resolve(__dirname);
    global.appRoot = global.appRoot.replace('/lib','');
}
//Intel logger setup
const intel = require('intel');
const DBLog = intel.getLogger('DBLog');
DBLog.setLevel(DBLog.ERROR).addHandler(new intel.handlers.File(appRoot + '/logs/mongoDb/error.log'));
//Import the mongoose module
const config = require(appRoot + '/config/config.json').mongodbConnectionString,
    mongoose = require('mongoose');
try {
    mongoose.connect(config);
// Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
//Get the default connection
    const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
    db.on('error', e =>
        DBLog.error('Database connection error. ' + e.toString()));
} catch (e) {
    DBLog.error(e.message);
}

module.exports = mongoose;