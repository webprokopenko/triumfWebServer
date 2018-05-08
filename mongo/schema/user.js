module.exports = {
	username: String,
	email: {type: String, index: true, unique: true},
	password: String
};