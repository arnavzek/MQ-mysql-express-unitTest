require("dotenv").config();
var amqp = require("amqplib/callback_api");
const CONN_URL = process.env.RabbitMQ;

let postComment = require("../endpoints/postComment");
let postArticle = require("../endpoints/postArticle");

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(createChannel);
});

function createChannel(err, ch) {
  // console.log("MQ channel created");
  ch.consume("postArticle", articleConsumer, { noAck: false });
  ch.consume("postComment", commentsConsumer, { noAck: false });

  function articleConsumer(msg) {
    consumer(postArticle, msg);
  }

  function commentsConsumer(msg) {
    consumer(postComment, msg);
  }

  function consumer(toCall, msg) {
    let content = JSON.parse(msg.content.toString());
    toCall(content, () => {
      ch.ack(msg);
    });
  }
}
module.exports = {};
