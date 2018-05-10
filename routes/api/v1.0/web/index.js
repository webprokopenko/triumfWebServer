const express = require('express');
const app = module.exports = express();
const authController = require(`${appRoot}/controllers/authController`);


app.post('/create', function (req, res) {
    authController.createUser(req.body)
        .then(user => {
            authController.authorizeUser(req, res);
        })
        .catch(err => {
            res.status(503).send('Service error. ' + err);
        })
});
app.post('/auth', function (req, res) {
    authController.authorizeUser(req.body.email, req.body.password)
        .then(token => {
            res.send(token)
        })
        .catch(err => {
            res.status(503).send(err);
        })

});
app.get('/', authController.authen, function (req, res) {
    res.send('Congratulations, you are in a secret area! Welcome ' + req.user.email);
});

app.get('/deffault', (req, res, next) => {
    res.send('deffault');
});
