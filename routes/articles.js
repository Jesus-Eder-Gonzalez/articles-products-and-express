"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const { sendError } = require("../helper/errorHandler");
const artDB = require("../db/articles");

const articleDB = artDB();

const renderParams = function(dbResults, type) {
  switch (type) {
    case "all":
      return {
        currentDBName: "Article Repository",
        articles: dbResults
      };
    default:
      return {
        currentDBName: "Article Repository",
        ...dbResults
      };
  }
};

router
  .route("/")
  .get((req, res) => {
    articleDB
      .getArticles()
      .then(results => {
        res.render("./articles/index", renderParams(results, "all"));
      })
      .catch(err => {
        sendError(req.originalUrl, res, err);
      });
  })
  .post((req, res) => {
    articleDB
      .addArticle(encodeURIComponent(req.body.title), req.body)
      .then(success => {
        if (!success) {
          throw new Error("This article already exists");
        }
      })
      .then(() => {
        res.redirect(`./${encodeURIComponent(req.body.title)}`);
      })
      .catch(err => {
        sendError(req.originalUrl, res, err);
      });
  });

router.route("/new").get((req, res) => {
  res.render("./articles/new", renderParams());
});

router.route("/:title/edit").get((req, res) => {
  return articleDB
    .getArticle(encodeURIComponent(req.params.title))
    .then(article => {
      res.render("./articles/edit", renderParams(article));
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

router
  .route("/:title")
  .get((req, res) => {
    return articleDB
      .getArticle(encodeURIComponent(req.params.title))
      .then(article => {
        res.render("./articles/article", renderParams(article));
      })
      .catch(err => {
        sendError(req.originalUrl, res, err);
      });
  })
  .put((req, res) => {
    return articleDB
      .editArticle(encodeURIComponent(req.params.title), {
        ...req.body,
        url_title: encodeURIComponent(req.body.title)
      })
      .then(() => {
        return res.redirect(`/articles/${encodeURIComponent(req.body.title)}`);
      })
      .catch(err => {
        sendError(req.originalUrl, res, err);
      });
  })
  .delete((req, res) => {
    articleDB.removeArticle(encodeURIComponent(req.params.title));
    res.redirect("/articles");
  });

module.exports = router;
