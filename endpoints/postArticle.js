var db = require("../db");

let postArticle = (params, callback) => {
  let nickname = db.escape(params.nickname);
  let title = db.escape(params.title);
  let content = db.escape(params.content);

  let query = `INSERT INTO article (nickname,title, content) VALUES 
    (${nickname},${title},${content})`; // query database to get all the players

  // execute query
  db.query(query, (err, article) => {
    callback(article, err);
    if (err) return console.log(err);
    //console.log("Article Posted", params, article);
  });
};

module.exports = postArticle;
