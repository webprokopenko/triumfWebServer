var userSchema = require('./user');

module.exports = {
	accessToken: String,
	expires: {type: Date, index: true},
	clientId: {type: String, index: 1},
	user: userSchema
};