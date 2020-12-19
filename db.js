var mysql = require("mysql");

var db_config = {
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "divtech",
};

var connection;

function makeConnection() {
  connection = mysql.createConnection(db_config);

  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(makeConnection, 2000); //reconnect
    } else {
      console.log("DB connection established!");
    }
  });

  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      makeConnection();
    } else {
      console.error("connnection idle timeout");
      throw err;
    }
  });
}

makeConnection();

module.exports = connection;
