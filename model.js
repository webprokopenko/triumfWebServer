const mongoose = require('mongoose');

/**
 * Configuration.
 */

const clientModel = require('./mongo/model/client'),
	tokenModel = require('./mongo/model/token'),
	userModel = require('./mongo/model/user');

/**
 * Add example client and user to the database (for debug).
 */

const loadExampleData = function() {
	try {
        let client = new clientModel({
            clientId: 'application',
            clientSecret: 'secret'
        });

        let user = new userModel({
            id: '123',
            username: 'pedroetb',
            password: 'password'
        });
        client.save().then(cl => {console.dir('in');
            console.log('Created client', cl);
        }).catch(err => {console.dir('in');
            console.dir(err);
        });

        user.save(function(err, user) {

            if (err) {
                return console.error(err);
            }
            console.log('Created user', user);
        });
	} catch (error) {console.dir(error)}
};

/**
 * Dump the database content (for debug).
 */

var dump = function() {

	clientModel.find(function(err, clients) {

		if (err) {
			return console.error(err);
		}
		console.log('clients', clients);
	});

	tokenModel.find(function(err, tokens) {

		if (err) {
			return console.error(err);
		}
		console.log('tokens', tokens);
	});

	userModel.find(function(err, users) {

		if (err) {
			return console.error(err);
		}
		console.log('users', users);
	});
};

/*
 * Get access token.
 */

const getAccessToken = function(bearerToken, callback) {

	tokenModel.findOne({
		accessToken: bearerToken
	}, callback);
};

/**
 * Get client.
 */

const getClient = function(clientId, clientSecret, callback) {

	clientModel.findOne({
		clientId: clientId,
		clientSecret: clientSecret
	}, callback);
};

/**
 * Grant type allowed.
 */

const grantTypeAllowed = function(clientId, grantType, callback) {

	callback(false, grantType === "password");
};

/**
 * Save token.
 */

const saveAccessToken = function(accessToken, clientId, expires, user, callback) {

	const token = new tokenModel({
		accessToken: accessToken,
		expires: expires,
		clientId: clientId,
		user: user
	});

	token.save(callback);
};

/*
 * Get user.
 */

const getUser = function(username, password, callback) {

	userModel.findOne({
		username: username,
		password: password
	}, callback);
};

/**
 * Export model definition object.
 */
const saveAuthorizationCode = function (code, client, user) {
    // imaginary DB queries
    let authCode = {
        authorization_code: code.authorizationCode,
        expires_at: code.expiresAt,
        redirect_uri: code.redirectUri,
        scope: code.scope,
        client_id: client.id,
        user_id: user.id
    };
    return authCode;/*db.saveAuthorizationCode(authCode)
        .then(function(authorizationCode) {
            return {
                authorizationCode: authorizationCode.authorization_code,
                expiresAt: authorizationCode.expires_at,
                redirectUri: authorizationCode.redirect_uri,
                scope: authorizationCode.scope,
                client: {id: authorizationCode.client_id},
                user: {id: authorizationCode.user_id}
            };
        });*/
};
var getUserFromClient = function(clientId, clientSecret, callback) {

    callback(false, {
        id: '123',
        username: 'pedroetb',
        password: 'password'
    });
};

module.exports = {
	getAccessToken: getAccessToken,
	getClient: getClient,
	grantTypeAllowed: grantTypeAllowed,
	saveAccessToken: saveAccessToken,
    getUser: getUser,
    loadExampleData: loadExampleData,
    saveAuthorizationCode: saveAuthorizationCode,
    getUserFromClient: getUserFromClient
};