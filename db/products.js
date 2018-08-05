"use strict";

const db = require("./knex");

function productDB() {
  function addProduct(prodParams) {
    let temp = {
      name: prodParams.title,
      price: prodParams.body,
      inventory: prodParams.author
    };
  }

  function editItem(uid, objEditFields) {
    let retObj;

    if (_productArr[idToArrInx[uid]]) {
      let keys = Object.keys(objEditFields);
      if (keys.length > 0) {
        let temp = _productArr[idToArrInx[uid]];
        keys.forEach(key => {
          temp[key] = objEditFields[key];
        });
        _productArr[idToArrInx[uid]] = temp;
        retObj = { success: true, id: uid };
      } else {
        retObj = {
          success: false,
          reason:
            "No product fields were provided. Change to name, price, or inventory.",
          id: uid
        };
      }
    } else {
      retObj = {
        success: false,
        reason: "Item does not exist, try a POST request to create the item.",
        id: uid
      };
    }
    return retObj;
  }

  function removeItem(uid) {
    let retObj;

    if (_productArr[idToArrInx[uid]]) {
      _productArr[idToArrInx[uid]] = "";
      retObj = { success: true, uid: uid };
    } else {
      retObj = {
        success: false,
        reason: "Item does not exist, try a POST request to create the item.",
        id: uid
      };
    }

    return retObj;
  }

  function returnProduct(id) {
    return db("products")
      .select()
      .where({ id: id })
      .then(product => {
        if (!product.length) {
          throw new Error("Product doesn't exist");
        }
        return product[0];
      });
  }

  function returnProducts() {
    return db("products")
      .select()
      .then(products => {
        if (!products.length) {
          throw new Error("No products to return");
        }
        return products;
      });
  }

  return {
    addProd: addProduct,
    editProd: editItem,
    removeProd: removeItem,
    returnProducts,
    returnProduct
  };
}

module.exports = productDB;
