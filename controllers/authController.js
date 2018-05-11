const intel = require('intel');
const AuthError = intel.getLogger('AuthError');
AuthError.setLevel(AuthError.ERROR).addHandler(new intel.handlers.File(`${appRoot}/logs/user/error.log`));

const userModel = require(`${appRoot}/mongo/model/user`);
const authLib = require(`${appRoot}/lib/auth`);

const createUser = (data) => {
    return new Promise((resolve, reject) => {
        try {
            userModel.create({
                email: data.email,
                password: data.password
            }, (err, user) => {
                if (err) {
                    AuthError.error('createUser error: ' + err);
                    return reject(err.code === 11000 ? 'User exists' : err);
                }
                return resolve(user);
            });
        } catch (error) {
            AuthError.error('Error createUser authController' + error);
            return reject('Service error');
        }
    })
}
const authorizeUser = (email, password) => {
    return new Promise((resolve, reject) => {
        _authorization(email, password)
            .then(token => {
                (token ? resolve({ token: token }) : reject('Email password not exist'));
            })
            .catch(err => {
                AuthError.error('authorizeUser error: ' + err);
                return reject('Server error');
            });
    });
}

const authen = (req, res, next) => {
    return new Promise((resolve, reject) => {
        authLib._verifyJWT(req.headers['a-token'])
            .then((id) => {
                userModel.findOne({ _id: id })
                    .then(user => {
                        req.user = user;
                        next();
                    })
                    .catch(err => {
                        AuthError.error('authen error: ' + err);
                        res.statuse(401).send('');
                    })
            })
            .catch(err => {
                res.status(401).send('_verifyJWT error: ' + err);
            });
    });
};

const _authorization = async function (email, password) {
    try{
        const user = await userModel.findOne({ email: email });
        if (!user || user.password !== password){
            return false;
        } 
        const JWT =  await authLib._getJWT(user._id.toString());
        return JWT;
    } catch (err) {
        console.log('_authorization error' + err);
    }
};

module.exports = {
    createUser: createUser,
    authen: authen,
    authorizeUser: authorizeUser
};