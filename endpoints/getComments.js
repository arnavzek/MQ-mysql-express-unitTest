var db = require("../db");

let getComments = (req, res) => {
  let title = db.escape(req.query.title);

  let query = `SELECT * FROM comment WHERE title = ${title}`;

  // execute query
  db.query(query, (err, comments) => {
    if (err) {
      return res.send(err);
    }
    res.json(comments);
  });
};

module.exports = getComments;
