// Require express and create an instance of it
const express = require('express');
const app = express();
app.disable("x-powered-by");

const axios = require('axios');

const logger = require('./logger')
const httpLogger = require('./httpLogger')

app.use(httpLogger)

app.get('/', function (_req, res) {
    logger.debug('This is the "/" route.')
    logger.info("Welcome to the Esquire Micro-service")

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('Welcome to the Esquire Micro-service')

});

app.get("/esquire", async (_req, res) => {
    logger.debug('This is the "/esquire" route.')
    logger.info("Simon Owusu Esq ")
    res.status(200).send("Simon Owusu Esq :)");
});

app.get("/go", async (_req, res) => {
    logger.debug('This is the "/go" route.')
    logger.info("Calling Golang Service...")
    await axios({
      method: 'GET',
      url: 'http://192.168.0.9:4000/go'
    })
    .then(function (response) {
      logger.info('Calling Golang Service...')
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end('Calling Golang Service...')
      console.log(response);
    })
    .catch(function (error) {
      logger.error('Failed to call Golang Service...')
      logger.error('Application Error - ', error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end('Failed to call Golang Service...')
      console.log(error);
    })
    .then(function () {
      // always executed
      logger.debug('This is the "/esquire" route.')
    }); 
});

app.use(function(_req, res) {
    logger.debug('This is for erroneous route.')
    logger.info("Sorry, that route doesn't exist. Have a nice day :)")
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.listen(3002, function () {
    console.log('Esquire Service is listening on port 3002.');
});
