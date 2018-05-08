const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();
const oauthController = require(`${appRoot}/controllers/oauthController`);
const Auth = require(appRoot + '/lib/auth');

app.post('/auth', Auth.autorize);
app.get('/', Auth.authen, function (req, res) {
	res.send('Congratulations, you are in a secret area!');
});

app.get('/deffault', (req, res, next) => {
    res.send('deffault');
});

//app.use(app.oauth.errorHandler());
