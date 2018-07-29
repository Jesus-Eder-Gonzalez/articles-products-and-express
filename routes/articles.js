'use strict';
const express = require('express');
const app = express();
const router = express.Router();

const articleDB = require('../db/articles');

let artDB = articleDB();

router.route('/')
  .get((req, res) => {
    let articles = artDB.getArticles();

    console.log(articles);

    res.render('./articles/index', Object.assign({
      currentDBName: 'Article Repository'
    },
      { articles: articles }));
  })
  .post((req, res) => {
    let success = artDB.addArticle(encodeURIComponent(req.body.title), req.body);

    if (!success) {
      res.send('This article already exists');
    }

    let articles = artDB.getArticle(encodeURIComponent(req.body.title));
    console.log('inserted',articles);
    res.redirect(`./${encodeURIComponent(req.body.title)}`);
  });

router.route('/new')
  .get((req, res) => {
    let articles = artDB.getArticle(req.params.id);

    console.log(articles);

    res.render('./articles/new', Object.assign({
      currentDBName: 'Article Repository'
    },
      articles));
  });


router.route('/:title/edit')
  .get((req, res) => {
    let articles = artDB.getArticle(encodeURIComponent(req.params.title));

    console.log(articles);
    console.log(articles.body);

    res.render('./articles/edit', Object.assign({
      currentDBName: 'Article Repository'
    },
      articles));
  });

router.route('/:title')
  .get((req, res) => {
    let articles = artDB.getArticle(encodeURIComponent(req.params.title));
    console.log('articles :', articles);
    console.log(req.params.title);

    res.render('./articles/article', Object.assign({
      currentDBName: 'Article Repository'
    },
      articles));
  })
  .put((req, res) => {
    let success = artDB.editArticle(encodeURIComponent(req.params.title), req.body);

    let articles = artDB.getArticle(encodeURIComponent(req.params.title));
    console.log(articles);
    res.redirect(`/articles/${req.params.title}`);
  })
  .delete((req,res) => {
    artDB.removeArticle(encodeURIComponent(req.params.title));
    res.redirect('/articles');
  });



module.exports = router;