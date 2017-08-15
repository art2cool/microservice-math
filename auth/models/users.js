
var mongoose = require('mongoose');

//User schema

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String,
		bcrypt: true,
		required: true
	},
	email: {
		type: String
	},
	role: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);