const intel = require('intel');
const UserError = intel.getLogger('UserError');
UserError.setLevel(UserError.ERROR).addHandler(new intel.handlers.File(`${appRoot}/logs/user/error.log`));

const userModel = require(appRoot + '/mongo/model/user'),
    Math = require('mathjs');

function createUser(data) {
    return new Promise((resolve, reject) => {
        try {
            userModel.create({
                id: Math.floor(Math.random() * 1e16),
                name: data.name,
                email: data.email,
                password: data.password
            }, (err, user) => {
                if(err) {
                    UserError.error('createUser error: ' + err);
                    return reject(err.code === 11000 ? 'User exists.': '');
                }
                return resolve(user);
            });

        } catch(error) {
            UserError.error('createUser error: ' + error);
            return reject();
        }
    })
}
module.exports = {
    createUser: createUser
};