"use strict";
const express = require("express");

const app = express();
const router = express.Router();

const prodDB = require("../db/products");
const errorRender = require("../helper/errorRender");
const { renderParamsP } = require("../helper/standardMessage");
const { sendError } = require("../helper/errorHandler");

let productDB = prodDB();

router
  .route("/")
  .get((req, res) => {
    return productDB
      .returnProducts()
      .then(products => {
        res.render(
          "./products/index",
          renderParamsP(products, errorRender(res, app), "all")
        );
      })
      .catch(err => {
        sendError(req.originalUrl, res, err);
      });
  })
  .post((req, res) => {
    console.log(req.params);
    console.log(res.locals.params);

    if (req.params.name && req.params.price && req.params.inventory) {
      let uid = Math.floor(Math.random() * 200);

      const passObj = {
        id: uid,
        name: req.params.name,
        price: parseFloat(req.params.price),
        inventory: Number(req.params.inventory)
      };

      let success = productDB.addProd(passObj);

      console.log(`POST success: ${success}`);
      console.log(success.success);
      if (success.success) {
        res.redirect("/products");
      } else {
        app.locals.error = Object.assign({ reason: success.reason }, passObj);
        console.log(app.locals.error);
        res.redirect("/products/new");
      }
    } else {
      res
        .status(400)
        .send("The fields name, price and inventory are not optional.");
    }
  });

router.route("/new").get((req, res) => {
  res.render("./products/new", errorRender(res, app));
});

router.route("/:id/edit").get((req, res) => {
  return productDB
    .returnProduct(req.params.id)
    .then(product => {
      res.render(
        "./products/edit",
        renderParamsP(product, errorRender(res, app))
      );
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

router
  .route("/:id")
  .get((req, res) => {
    productDB
      .returnProduct(req.params.id)
      .then(product => {
        res.render(
          "./products/product",
          renderParamsP(product, errorRender(res, app))
        );
      })
      .catch(err => {
        sendError(req.originalUrl, res, err);
      });
  })
  .put((req, res) => {
    console.log("/products/:id/put");
    console.log(req.params);
    let success;
    let catalog = productDB.getProd(req.params.id);
    let hasProd = catalog ? !!Object.keys(catalog).length : false;

    if (hasProd) {
      success = productDB.editProd(req.params.id, req.params);

      console.log("Success Edit: " + success);
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
    console.log("/products/:id/put");
    let catalog = productDB.removeProd(req.params.id);
    console.log("delete: " + catalog);
    console.log(catalog);
    if (catalog.success) {
      res.redirect("/products");
    } else {
      if (productDB.getProd(req.params.id)) {
        app.locals.error = Object.assign(
          { reason: "Error processing delete, please try again." },
          { id: req.params.id }
        );
        console.log("delete locals");
        console.log(app.locals.error);
        res.redirect(`/products/${req.params.id}/edit`);
      } else {
        app.locals.error = Object.assign(
          { reason: catalog.reason },
          { id: req.params.id }
        );
        console.log("delete locals" + app.locals.error);
        console.log(app.locals.error);
        res.redirect(`/products/`);
      }
    }
  });

module.exports = router;
