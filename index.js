let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let path = require("path");

let getArticle = require("./endpoints/getArticle");

let getComments = require("./endpoints/getComments");

let publishToQueue = require("./MQ/producer");
let consumer = require("./MQ/consumer");

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "./public");

app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/article", getArticle);

app.get("/comment", getComments);

app.post("/article", (req, res) => {
  publishToQueue("postArticle", req.query);
  res.send("queued");
});

app.post("/comment", (req, res) => {
  publishToQueue("postComment", req.query);
  res.send("queued");
});

app.get("/", (req, res, next) => {
  res.send("❤️");
});
//unit test

//ho to send html files

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
