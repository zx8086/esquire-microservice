const express = require('express');
const router = express.Router();
const { Kafka } = require('kafkajs');
const kafka = new Kafka({

})
const sendKafkaMessage = async () => {
 const producer = kafka.producer();
 await producer.connect();
 await producer.send({
   topic: 'test-topic',
   messages: [
     { value: 'Hello KafkaJS user!' },
   ],
 })
 await producer.disconnect();
}
const consumeMessages = async () => {
 const consumer = kafka.consumer({ groupId: 'test-group' });
 await consumer.connect();
 await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
 await consumer.run({
   eachMessage: async ({ topic, partition, message }) => {
     console.log({
       value: message.value.toString(),
     })
   },
 })
}
/* GET home page. */
router.get('/', async function(req, res, next) {
 await sendKafkaMessage();
 await consumeMessages();
 res.render('index', { title: 'Express' });
});
module.exports = router;