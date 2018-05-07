const mongoose = require(appRoot + '/lib/db'),
    modelName = 'user',
    schemaDefinition = require(appRoot + '/mongo/schema/' + modelName),
    schemaInstance = new mongoose.Schema(schemaDefinition);
const modelInstance = mongoose.model(modelName, schemaInstance);
module.exports = modelInstance;