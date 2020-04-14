require('dotenv').config();

const express = require('express');
const router = require('./Route/router');
const mongo = require('./Settings/settings');
const app = express();

const port =  process.env.PORT || 8080;
const appName = process.env.APP_NAME;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
   });

app.use(router);

// Endpoint 1

app.get('/', (req, res) => {
    res.send('Welcome to Basic Auth API')
});

app.listen(port, (res) => {

    console.log(`${appName} is listening on ${port}`)
});

