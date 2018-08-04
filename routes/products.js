"use strict";
const express = require("express");

const app = express();
const router = express.Router();

const productDB = require("../db/products");
const errorRender = require("../helper/errorRender");
let prodDB = productDB();

router
  .route("/")
  .get((req, res) => {
    let catalog = prodDB.prodCatalog();
    let renderErrorObj = {};
    let renderParamObj = {
      currentDBName: "Product Catalog",
      catalog
    };

    renderErrorObj = errorRender(res, app);
    renderParamObj = renderErrorObj
      ? Object.assign(renderParamObj, renderErrorObj)
      : renderParamObj;

    res.render("./products/index", renderParamObj);
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

      let success = prodDB.addProd(passObj);

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
  console.log(res.locals);
  console.log("products/new");
  console.log(app.locals.error);
  if (app.locals.error) {
    res.render("./products/new", app.locals.error);
    app.locals.error = "";
  } else {
    res.render("./products/new");
  }
});

router.route("/:id/edit").get((req, res) => {
  console.log("/products/:id/edit");
  console.log(req.error);
  if (app.locals.error) {
    res.render("./products/edit", app.locals.error);
    app.locals.error = "";
  } else {
    let catalog = prodDB.getProd(req.params.id);
    let hasProd = catalog ? !!Object.keys(catalog).length : false;
    if (hasProd) {
      res.render(
        "./products/edit",
        Object.assign(
          {
            currentDBName: "Product Catalog",
            notEmpty: hasProd
          },
          catalog
        )
      );
    } else {
      res.redirect("/products");
    }
  }
});

router
  .route("/:id")
  .get((req, res) => {
    console.log("/products/:id");
    console.log(req.params.id);
    let catalog = prodDB.getProd(req.params.id);
    console.log(catalog);
    res.render(
      "./products/product",
      Object.assign(
        {
          currentDBName: "Product Catalog"
        },
        catalog
      )
    );
  })
  .put((req, res) => {
    console.log("/products/:id/put");
    console.log(req.params);
    let success;
    let catalog = prodDB.getProd(req.params.id);
    let hasProd = catalog ? !!Object.keys(catalog).length : false;

    if (hasProd) {
      success = prodDB.editProd(req.params.id, req.params);

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
    let catalog = prodDB.removeProd(req.params.id);
    console.log("delete: " + catalog);
    console.log(catalog);
    if (catalog.success) {
      res.redirect("/products");
    } else {
      if (prodDB.getProd(req.params.id)) {
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
