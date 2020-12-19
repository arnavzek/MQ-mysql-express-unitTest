var db = require("../db");

let postComment = (params, callback) => {
  let nickname = db.escape(params.nickname);
  let title = db.escape(params.title);
  let content = db.escape(params.content);
  let commentReference = db.escape(params.commentReference);

  let query = `INSERT INTO comment (nickname,title, content,commentReference) VALUES 
    (${nickname},${title},${content},${commentReference})`; // query database to get all the players

  // execute query
  db.query(query, (err, comment) => {
    callback(comment);
    if (err) return console.log(err);
    console.log("comment posted", params, comment);
  });
};

module.exports = postComment;
