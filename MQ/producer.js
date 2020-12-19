require("dotenv").config();
let amqp = require("amqplib/callback_api");
const CONN_URL = process.env.RabbitMQ;

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, channel) {
    ch = channel;
  });
});

module.exports = publishToQueue = async (queueName, data) => {
  ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
};

process.on("exit", (code) => {
  ch.close();
  console.log(`Closing RabbitMQ channel`);
});
