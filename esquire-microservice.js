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

app.use(httpLogger)

app.get('/', function (_req, res) {
    logger.debug('This is the "/" route.')
    logger.info("Welcome to the Esquire Micro-service")
    res.status(200).setHeader('Content-Type', 'application/json').send('Welcome to the Esquire Micro-service')

})

app.get("/trace", async (_req, res) => {
    logger.debug('This is the "/esquire" route.')
    logger.info("Simon Owusu Esq ")
    res.status(200).setHeader('Content-Type', 'application/json').send("Simon Owusu Esq :)")
})

app.use(function(_req, res) {
    logger.debug('This is for erroneous route.')
    logger.info("Sorry, that route doesn't exist. Have a nice day :)")
    res.status(404).setHeader('Content-Type', 'application/json').send("Sorry, that route doesn't exist. Have a nice day :)")
})

app.listen({port}, function () {
    console.log('Esquire Service is listening on port 8072.')
})
