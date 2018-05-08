if(!global.appRoot) {
    const path = require('path');
    global.appRoot = path.resolve(__dirname);
    global.appRoot = global.appRoot.replace('/lib','');
}
const JWT = require('jsonwebtoken'),
    Config = require(appRoot + '/config/config').auth,
    userModel = require(appRoot + '/mongo/model/user');

//Intel logger setup
const intel = require('intel');
const AUTHLog = intel.getLogger('AUTHLog');
AUTHLog.setLevel(AUTHLog.ERROR).addHandler(new intel.handlers.File(appRoot + '/logs/auth/error.log'));

const key = global.appKey || '12345678';
const authorize = function(req, res) {
    try {
        _authorization(req.body.email, req.body.password)
            .then(token => {
                res.send({token: token});
            })
            .catch(err => {
                AUTHLog.error('_authorization error: ' + err);
                res.status(401).send('');
            });

    } catch (error) {
        AUTHLog.error('Authorization error: ' + error);
        res.status(401).send('');
    }
};
const authen = function(req, res, next) {
    try {
        _verifyJWT(req.headers['a-token'])
            .then((id) => {
                userModel.findOne({_id: id})
                    .then(user => {
                        req.user = user;
                        next();
                    })
                    .catch(err => {
                        AUTHLog.error('userModel error: ' + err);
                        res.statusCode(401).send('');
                    })
            })
            .catch(err => {
                AUTHLog.error('_verifyJWT error: ' + err);
                res.statusCode(401).send('');
            });

    } catch (error) {
        AUTHLog.error('Authentication error: ' + error);
        res.statusCode(401).send('');
    }
};
const _authorization = async function(email, password) {
    try {
        const user = await userModel.findOne({email: email});
        if(user.password !== password) return false;
        return await _getJWT(user._id.toString());
    } catch(error) {
        AUTHLog.error('_authorization error: ' + error);
        return false;
    }
};
const _getJWT = function(id) {
    return new Promise( (resolve, reject) => {
        try {
            const token = JWT.sign({
                id: id
            }, key, {
                expiresIn: Config.tokenExpires
            });
            return resolve(token);
        } catch (e) {
            AUTHLog.error(e.message);
            return reject();
        }
    })
};
const _verifyJWT = function(token) {
    return new Promise((resolve, reject) => {
        try {
            JWT.verify(token, key, (err, data) => {
                if (err) {
                    AUTHLog.error('Auth JWT.verify error: ' + err);
                    return reject();
                } else {
                    return resolve(data.id);
                }
            });
        } catch (error) {
            AUTHLog.error('Auth _verifyJWT error: ' + error);
            return reject();
        }
    })
};

module.exports = {
    authen: authen,
    authorize: authorize
};