const mongoose = require('../lib/db');
const clientModel = mongoose.model('client', new mongoose.Schema({
        clientId: String,
        clientSecret: String
    })),
    tokenModel = require('../mongo/model/token'),
    userModel = require('../mongo/model/user'),
    Auth = require('../lib/auth');
describe('Testing BTC',()=> {
    it('test', (done) => {
        const user = {
            id: '12345',
            username: 'nick',
            email: 'nick@gmail.com',
            password: 'password'
        };
        userModel.create(user, (err,cli) => {
            console.dir(err);
            console.dir(cli);
        });
        done();
    });
    it('test token model', (done) => {
        userModel
            .findOne({id: '123'})
            .then(user => {
                const token = {
                    accessToken: 'accToken',
                    expires: new Date(new Date() + 1000*3600),
                    user: user._id
                };
                tokenModel.create(token, (err, token) => {
                    console.dir(token);
                })
            })
            .catch(err => console.dir(err));
        /*const token = {
            accessToken: 'accToken',
            expires: new Date(new Date() + 1000*3600)
        };
        tokenModel.create(token, (err,cli) => {
            console.dir(err);
            console.dir(cli);
        });*/
        /*.then(cli => {console.dir('in...');
            console.dir(cli);
        }).catch(error => {console.dir('in...');
            console.dir(error)
    });*/
        done();
    });
    it('test auth', (done) => {
        Auth
            .test('nick@gmail.com', 'password')
            .then(user => {
                console.dir(user);
            });
        done();
    });
});