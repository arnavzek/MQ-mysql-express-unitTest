var db = require("../db");

let getArticle = (req, res) => {
  let title = req.query.title;
  let query = `SELECT * FROM article WHERE title = ${db.escape(title)}`;

  // execute query
  db.query(query, (err, articles) => {
    if (err) {
      return res.send(err);
    }
    res.json(articles);
  });
};

module.exports = getArticle;
