const intel = require('intel');
const AuthError = intel.getLogger('AuthError');
AuthError.setLevel(AuthError.ERROR).addHandler(new intel.handlers.File(`${appRoot}/logs/user/error.log`));

const authLib = require(`${appRoot}/lib/auth`);

const createUser = (data) => {
    return new Promise((resolve, reject) => {
        try {
            authLib._createUser(data)
                .then(user => resolve(user))
                .catch(err => {
                    return reject(err.code === 11000 ? 'User exists' : err);
                })
        } catch (error) {
            AuthError.error('Error createUser authController' + error);
            return reject('Service error');
        }
    })
}
const authorizeUser = (email, password) => {
    return new Promise((resolve, reject) => {
        try {
            authLib._findUserByEmail(email)
                .then(user => {
                    if (!user || user.password !== password) {
                        return reject('Email password not exist');
                    }
                    authLib._getJWT(user._id.toString())
                        .then(token => {
                            return resolve({ token: token })
                        })
                })
        } catch (err) {
            AuthError.error('Error authorizeUser authController' + err);
            return reject('Server error');
        }
    });
}

const authen = (req, res, next) => {
    return new Promise((resolve, reject) => {
        authLib._verifyJWT(req.headers['a-token'])
            .then((id) => {
                authLib._findUserById(id)
                    .then(user => {
                        req.user = user;
                        next();
                    })
                    .catch(err => {
                        AuthError.error('authen error: ' + err);
                        res.statuse(401).send('Service error');
                    })
            })
            .catch(() => {
                res.status(401).send('JWT not verified');
            });
    });
};

module.exports = {
    createUser: createUser,
    authen: authen,
    authorizeUser: authorizeUser
};