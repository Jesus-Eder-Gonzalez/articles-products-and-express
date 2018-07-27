'use strict';
const express = require('express');

const app = express();
const router = express.Router();

const productDB = require('../db/products');

let prodDB = productDB();

router.route('/')
  .get((req, res) => {
    console.log('locals: '+app.locals.error);
    if (app.locals.error) {
      res.render('index', {
        'currentDBName': 'Product Catalog',
        'reason': app.locals.error.reason,
        'notEmpty': false
      });
      app.locals.error = '';
    } else {
      let catalog = prodDB.prodCatalog();
      catalog = catalog.filter(item => item.hasOwnProperty('name'));
      let hasProd = catalog.length > 0 ? true : false;
      console.log(catalog);
      res.render('index', {
        'currentDBName': 'Product Catalog',
        'catalog': catalog,
        'notEmpty': hasProd
      });
    }
  })
  .post((req, res) => {
    console.log(req.body);
    if (req.body.name &&
      req.body.price &&
      req.body.inventory) {

      let uid = Math.floor(Math.random() * 200);

      const passObj = {
        id: uid,
        name: req.body.name,
        price: parseFloat(req.body.price),
        inventory: Number(req.body.inventory)
      };

      let success = prodDB.addProd(passObj);

      console.log(`POST success: ${success}`)
      console.log(success.success);
      if (success.success) {
        res.redirect('/products')
      } else {
        app.locals.error = Object.assign({ reason: success.reason }, passObj);
        console.log(app.locals.error);
        res.redirect('/products/new');
      }
    } else {
      res.status(400).send('The fields name, price and inventory are not optional.');

    }

  });

router.route('/new')
  .get((req, res) => {
    console.log('products/new');
    console.log(app.locals.error);
    if (app.locals.error) {
      res.render('new', app.locals.error);
      app.locals.error = '';
    } else {
      res.render('new');
    }
  })

router.route('/:id/edit')
  .get((req, res) => {
    console.log('/products/:id/edit');
    console.log(req.params)
    if (app.locals.error) {
      res.render('edit', app.locals.error);
      app.locals.error = '';
    } else {
      let catalog = prodDB.getProd(req.params.id);
      let hasProd = catalog ? !!Object.keys(catalog).length : false;
      if (hasProd) {
        res.render('edit', Object
          .assign({
            'currentDBName': 'Product Catalog',
            'notEmpty': hasProd
          }, catalog));
      } else {
        res.redirect('/products');
      }
    }
  });

router.route('/:id')
  .get((req, res) => {
    console.log('/products/:id');

    let catalog = prodDB.getProd(req.params.id);
    let hasProd = catalog ? !!Object.keys(catalog).length : false;

    res.render('product', Object
      .assign({
        'currentDBName': 'Product Catalog',
        'notEmpty': hasProd
      }, catalog));
  })
  .put((req, res) => {
    console.log('/products/:id/put');
    console.log(req.body);
    let success;
    let catalog = prodDB.getProd(req.params.id);
    let hasProd = catalog ? !!Object.keys(catalog).length : false;

    if (hasProd) {
      success = prodDB.editProd(req.params.id, req.body);

      console.log('Success Edit: ' + success);
      console.log(success);
      if (success.success) {
        res.redirect(`/products/${req.params.id}`);
      } else {
        app.locals.error = Object.assign({ reason: success.reason }, passObj);
        console.log(app.locals.error);
        res.redirect(`/products/${req.params.id}/edit`);
      }
    }
  })
  .delete((req, res) => {
    console.log('/products/:id/put');
    let catalog = prodDB.removeProd(req.params.id);
    console.log("delete: " + catalog);
    console.log(catalog);
    if (catalog.success) {
      res.redirect('/products');
    } else {
      if(prodDB.getProd(req.params.id)){
        app.locals.error = Object.assign({ reason: 'Error processing delete, please try again.' }, {id:req.params.id});
        console.log('delete locals');
        console.log(app.locals.error);
        res.redirect(`/products/${req.params.id}/edit`);
      } else {
        app.locals.error = Object.assign({ reason: catalog.reason }, {id : req.params.id});
        console.log('delete locals'+app.locals.error);
        console.log(app.locals.error);
        res.redirect(`/products/`);
      }

    }

  });



module.exports = router;