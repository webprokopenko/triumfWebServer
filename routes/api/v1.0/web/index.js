const express = require('express');
var bodyParser = require('body-parser');
const app = module.exports = express();
const oauthController = require(`${appRoot}/controllers/oauthController`);
const oauthServer = require('node-oauth2-server');

// Oauth2
app.oauth = oauthServer({
    model: require('../../../../model.js'),
    grants: ['password'],
    debug: true,
  });


app.all('/oauth/token', app.oauth.grant());

app.get('/reg', (req, res, next) => {
    
});
app.get('/', app.oauth.authorise(), function (req, res) {
	res.send('Congratulations, you are in a secret area!');
});

app.get('/deffault', (req, res, next) => {
    res.send('deffault');
})

app.use(app.oauth.errorHandler());
