const express = require('express');
var bodyParser = require('body-parser');
const app = module.exports = express();
const oauthController = require(`${appRoot}/controllers/oauthController`);



app.get('/auth', (req, res, next) => {
    
});
app.get('/reg', (req, res, next) => {
    
});
app.get('/getWallets', (req, res, next) => {
    //req with Oauth will return empty object
});

