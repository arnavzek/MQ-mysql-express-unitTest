let app = require("../index.js");
let request = require("supertest");
var expect = require("chai").expect;
var db = require("../db");
let postComment = require("../endpoints/postComment");
let postArticle = require("../endpoints/postArticle");

let mockArticle = {
  title: "mocha-test",
  content: "Zebras are not horses",
  nickname: "Zebo",
};

let mockComment = {
  title: "mocha-test",
  content: "Really!!!",
  nickname: "Zebo Junior",
};

describe("Endpoint testing", function () {
  it("should post an article", function (done) {
    postArticle(mockArticle, (article, err) => {
      expect(err).to.be.equal(null);
      done(err);
    });
  });

  it("should post a comment", function (done) {
    postComment(mockComment, (article, err) => {
      expect(err).to.be.equal(null);
      done(err);
    });
  });

  it("should read article", function (done) {
    request(app)
      .get("/article")
      .send({ title: mockArticle.title })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should read comment", function (done) {
    request(app)
      .get("/comment")
      .send({ title: mockArticle.title })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        deleteMockArticle(mockArticle.title);
        deleteMockComments(mockArticle.title);
        done();
      });
  });
});

function deleteMockArticle(title) {
  let query = `DELETE FROM article WHERE title=${db.escape(title)}`;

  // execute query
  db.query(query, (err, articles) => {
    if (err) {
      return console.log(err);
    }
  });
}

function deleteMockArticle(title) {
  let query = `DELETE FROM article WHERE title=${db.escape(title)}`;

  // execute query
  db.query(query, (err, articles) => {
    if (err) {
      return console.log(err);
    }
  });
}

function deleteMockComments(title) {
  let query = `DELETE FROM comment WHERE title=${db.escape(title)}`;

  // execute query
  db.query(query, (err, articles) => {
    if (err) {
      return console.log(err);
    }
  });
}
