// the kafka instance and configuration variables are the same as before

// create a new consumer from the kafka client, and set its group ID
// the group ID helps Kafka keep track of the messages that this client
// is yet to receive

// const consumer = kafka.consumer({ groupId: process.env.GROUP_ID })

// const consume = async () => {
// 	await consumer.connect();
// 	await consumer.subscribe({
// 	  topic: process.env.TOPIC,
// 	  fromBeginning: true,
// 	});    
// 	await consumer.run({
// 	  eachMessage: async ({ topic, partition, message }) => {
// 		console.log({
// 		  value: message.value.toString(),
// 		})
// 	  },
// 	});
//    }

// module.exports = consume