const mongoose = require(appRoot + '/lib/db'),
	modelName = 'client',
	schemaDefinition = require(appRoot + '/mongo/schema/' + modelName),
	schemaInstance = new mongoose.Schema(schemaDefinition),
	modelInstance = mongoose.model(modelName, schemaInstance);

module.exports = modelInstance;