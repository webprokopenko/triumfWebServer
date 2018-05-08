module.exports = {
	accessToken: String,
	expires: {type: Date, index: true},
	user: require('../../lib/db').Schema.Types.ObjectId
};