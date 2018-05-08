const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();
const oauthController = require(`${appRoot}/controllers/oauthController`);
const Auth = require(appRoot + '/lib/auth');

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
