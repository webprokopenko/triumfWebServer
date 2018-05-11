const JWT = require('jsonwebtoken'),
    Config = require(appRoot + '/config/config').auth,
    userModel = require(appRoot + '/mongo/model/user');

const key = global.appKey || '12345678';

const _getJWT = async function (id) {
    return new Promise((resolve, reject) => {
        try {
            const token = JWT.sign({
                id: id
            }, key, {
                    expiresIn: Config.tokenExpires
                });
            return resolve(token);
        } catch (e) {
            return reject(e);
        }
    })
};
const _verifyJWT = function (token) {
    return new Promise((resolve, reject) => {
        try {
            JWT.verify(token, key, (err, data) => {
                (err ? reject(err) : resolve(data.id))
            });
        } catch (error) {
            return reject('Auth _verifyJWT error: ' + error);
        }
    })
};

module.exports = {
    _getJWT: _getJWT,
    _verifyJWT: _verifyJWT
};