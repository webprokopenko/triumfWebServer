const express = require('express');
const app = module.exports = express();

app.use('/web', require('./web'));
app.get('/', (req, res) => {
    res.status(404).send('wrong query, choose v4.0/ETH');
});