const mongoose = require(appRoot + '/lib/db'),
    modelName = 'token',
    schemaDefinition = require(appRoot + '/mongo/schema/' + modelName),
    schemaInstance = new mongoose.Schema(schemaDefinition);
const modelInstance = mongoose.model(modelName, schemaInstance);
module.exports = modelInstance;