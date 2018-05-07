const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();
const oauthController = require(`${appRoot}/controllers/oauthController`);
const OauthServer = require('oauth2-server');
const Request = require('oauth2-server').Request;
const Response = require('oauth2-server').Response;

// Oauth2
app.oauth = new OauthServer({
    model: require(appRoot + '/model.js'),
    grants: ['password', 'client_credentials'],
    debug: true
  });


//app.all('/oauth/token', app.oauth.grant());
app.post('/oauth/token', (req, res) => {
    const request = new Request(req);
    const response = new Response(res);
    app.oauth.token(request, response);
});
app.post('/reg', (req, res, next) => {
    req.send('Not secret area');
});
/*app.get('/', app.oauth.authorize(), function (req, res) {
	res.send('Congratulations, you are in a secret area!');
});*/

app.get('/deffault', (req, res, next) => {
    res.send('deffault');
});

//app.use(app.oauth.errorHandler());
