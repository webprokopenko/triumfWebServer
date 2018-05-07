const mongoose = require('../lib/db');
//const liteController = require('../controllers/ltcController');
//const Modeljs = require('../model.js');
const clientModel = mongoose.model('client', new mongoose.Schema({
        clientId: String,
        clientSecret: String
    })),
    tokenModel = require('../mongo/model/token'),
    userModel = require('../mongo/model/user');
describe('Testing BTC',()=> {
    it('test', (done) => {
        const client = {
            clientId: 'application',
            clientSecret: 'secret'
        };
        clientModel.create(client, (err,cli) => {
            console.dir(err);
            console.dir(cli);
        });
            /*.then(cli => {console.dir('in...');
                console.dir(cli);
            }).catch(error => {console.dir('in...');
                console.dir(error)
        });*/
        done();
    });
});