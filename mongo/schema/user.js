module.exports = {
	id: {type: String, index: true, unique: true},
	username: String,
	email: {type: String, index: true, unique: true},
	password: String
};