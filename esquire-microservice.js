const http = require('http')
const port = process.env.PORT || 8072

const dotenv = require("dotenv")
dotenv.config()

const express = require('express')
const app = express()
app.disable("x-powered-by")
const axios = require('axios')
const logger = require('./logger')
const httpLogger = require('./httpLogger')

const kafkaInst = require("./kafka")

// const consume = require("./consume");

app.use(httpLogger)

app.get('/', function (_req, res) {
    logger.debug('This is the "/" route.')
    logger.info("Welcome to the Esquire Micro-service")
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('Welcome to the Esquire Micro-service')

})

app.get("/trace", async (_req, res, next) => {
    logger.debug('This is the "/esquire" route.')
    logger.info("Simon Owusu Esq ")
    res.status(200).send("Simon Owusu Esq :)")
})

app.use(function(_req, res) {
    logger.debug('This is for erroneous route.')
    logger.info("Sorry, that route doesn't exist. Have a nice day :)")
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)")
})

app.listen({port}, function () {
    console.log('Esquire Service is listening on port 8072.')
})
