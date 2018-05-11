const JWT = require('jsonwebtoken'),
    Config = require(appRoot + '/config/config').auth,
    userModel = require(appRoot + '/mongo/model/user');

const key = global.appKey || '12345678';

const _createUser = (data) => {
    return new Promise((resolve, reject) => {
        userModel.create({ email: data.email, password: data.password })
            .then(user => resolve(user))
            .catch(err => reject(err))
    })
}
const _findUserById = (id) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ _id: id })
            .then(user => {
                resolve(user)
            })
            .catch(() => {
                reject('_findUserById User not find');
            })
    });
}
const _findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: email })
            .then(user => {
                resolve(user)
            })
            .catch(() => {
                reject('_findUserById User not find');
            })
    });
}
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
    _createUser:        _createUser,
    _getJWT:            _getJWT,
    _verifyJWT:         _verifyJWT,
    _findUserById:      _findUserById,
    _findUserByEmail:   _findUserByEmail
};