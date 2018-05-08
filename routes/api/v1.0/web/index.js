const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();
const User = require(`${appRoot}/controllers/userController`);
const Auth = require(appRoot + '/lib/auth');

app.post('/create', function(req, res) {
    try {
        User.createUser(req.body)
            .then(user => {
                Auth.authorize(req, res);
            })
            .catch(err => {
                res.status(503).send('Service error. ' + err);
            })
    } catch (error) {
        res.status(503).send('Service error');
    }
});
app.post('/auth', function(req, res) {
    Auth.authorize(req, res);
});
app.get('/', Auth.authen, function (req, res) {
	res.send('Congratulations, you are in a secret area! Welcome ' + req.user.email);
});

app.get('/deffault', (req, res, next) => {
    res.send('deffault');
});

//app.use(app.oauth.errorHandler());
