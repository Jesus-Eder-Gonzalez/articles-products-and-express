'use strict';
const express = require('express');

const router = express.Router();
const routerId = express.Router({mergeParams: true});

const productDB = require('../db/products');
const bodyParser = require('body-parser');

router.use('/:id', routerId);

let prodDB = productDB();
// const app = express();

// app.use(bodyParser.json());

router.route('/')
  .get((req, res) => {
    let catalog = prodDB.prodCatalog();
    catalog = catalog.filter(item => item.hasOwnProperty('name'));
    let hasProd = catalog.length > 0 ? true:false;
    res.render('index', {
      'currentDBName': 'Product Catalog',
      'catalog': catalog,
      'notEmpty' : hasProd
    });
  })
  .post((req, res) => {
    res.send('smoketest POST');
  });

  routerId.route('/')
  .get((req, res) => {
    let catalog = prodDB.getProd(req.params.id);
    let hasProd = catalog? !!Object.keys(catalog).length :false;

    res.render('product', Object
      .assign({ 'currentDBName': 'Product Catalog',
      'notEmpty' : hasProd }, catalog));
  })
  .put((req, res) => {
    let catalog = prodDB.getProd(req.params.id);
    res.render('product', Object
      .assign({ 'currentDBName': 'Product Catalog' }, catalog));
  })
  .delete((req, res) => {
    let catalog = prodDB.removeProd(req.params.id);
    res.redirect('localhost:8080/products');
  });

  routerId.route('/')
  .get((req, res) => {
    let catalog = prodDB.getProd(req.params.id);
    let hasProd = catalog? !!Object.keys(catalog).length :false;

    res.render('product', Object
      .assign({ 'currentDBName': 'Product Catalog',
      'notEmpty' : hasProd }, catalog));
  })
module.exports = router;