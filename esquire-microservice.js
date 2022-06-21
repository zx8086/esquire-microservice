// Require express and create an instance of it
// const instrument = require('@aspecto/opentelemetry');
// instrument({aspectoAuth: '1cbb856b-0558-4e75-876f-3aee212f65c7'});

const dotenv = require("dotenv");
dotenv.config();

// // Add this to the VERY top of the first file loaded in your app
// var apm = require('elastic-apm-node').start({
//   // Override service name from package.json
//   // Allowed characters: a-z, A-Z, 0-9, -, _, and space
//   serviceName:  process.env.SERVICE_NAME,

//   // Use if APM Server requires a token
//   secretToken:  process.env.ELASTIC_APM_TOKEN,

//   // Set the service environment
//   environment:  process.env.DEPLOYMENT_ENVIRONMENT, 

//   // Set custom APM Server URL (default: http://localhost:8200)
//   serverUrl: 'http://192.168.0.156:8200'
// })

const express = require('express');
const app = express();
app.disable("x-powered-by");
const axios = require('axios');
const logger = require('./logger')
const httpLogger = require('./httpLogger')

const kafkaInst = require("./kafka");

// const consume = require("./consume");

const consumer = kafkaInst.consumer({ groupId: process.env.GROUP_ID })
consumer.connect();
consumer.subscribe({
  topic: process.env.TOPIC,
  fromBeginning: true,
}); 

const consumeMessages = async () => {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  });
 }

app.use(httpLogger)

app.get('/', function (_req, res) {
    logger.debug('This is the "/" route.')
    logger.info("Welcome to the Esquire Micro-service")
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('Welcome to the Esquire Micro-service')

});

app.get("/esquire", async (_req, res, next) => {
    logger.debug('This is the "/esquire" route.')
    logger.info("Simon Owusu Esq ")
    res.status(200).send("Simon Owusu Esq :)");
});

app.get("/consume", async (_req, res) => {
  logger.debug('This is the "/esquire" route.')
  logger.info("Simon Owusu Esq ")
  await consumeMessages().catch(async (error) => {
    console.error(error);
    try {
      logger.debug("Console Error....");
    } catch (e) {
      console.error("Failed to gracefully disconnect consumer", e);
      // await consumer.disconnect();
    }
    finally {
      console.log(`All Tasks are Done`);
      res.end("Consumed all Kafka messages...");
      consumer.disconnect();
      process.exit(1);
    }
  }
  );
  res.status(200).send("Simon Owusu Esq :)");
});

app.use(function(_req, res) {
    logger.debug('This is for erroneous route.')
    logger.info("Sorry, that route doesn't exist. Have a nice day :)")
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.listen(3002, function () {
    console.log('Esquire Service is listening on port 3002.');
});
