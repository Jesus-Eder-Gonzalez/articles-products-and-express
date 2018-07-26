'use strict';

function productDB() {
  const _productArr = [{name: 'slinky', price:100.00, inventory:10}];
  // const _productArr = [];
  const nameToID = {};

  function addItem(itemObj) {
    let retObj;
    if (!nameToID[itemObj.name]) {
      if (itemObj.name &&
        itemObj.price &&
        itemObj.inventory) {
        nameToID[itemObj.name] = _productArr.length;
        _productArr.push(itemObj);
        retObj = { success: true };
      } else {
        retObj = {
          success: false,
          reason: 'Missing item parameters.'
        };
      }
    } else {
      retObj = {
        success: false,
        reason: 'Item already exists, send a PUT request to edit an existing item.'
      }
    }
    return retObj;
  }

  function editItem(productID, objEditFields) {
    let retObj;

    if (_productArr[productID]) {
      let keys = Object.keys(objEditFields);
      if (keys.length > 0) {
        let temp = _productArr[productID];
        keys.forEach(key => {
          temp[key] = objEditFields[key];
        });
        _productArr[productID] = temp;
        retObj = { success: true, productID: productID };
      } else {
        retObj = {
          success: false,
          reason: 'No product fields were provided. Change to name, price, or inventory.',
          productID: productID
        };
      }
    } else {
      retObj = {
        success: false,
        reason: 'Item does not exist, try a POST request to create the item.',
        productID: productID
      };
    }
    return retObj;
  }

  function removeItem(productID) {
    let retObj;

    if (_productArr[productID]) {
      _productArr[productID] = {};
      retObj = { success: true, productID: productID };
    } else {
      retObj = {
        success: false,
        reason: 'Item does not exist, try a POST request to create the item.',
        productID: productID
      };
    }

    return retObj;
  }

  function returnItem(id) {
    return _productArr[id];
  }


  function returnArray() {
    return _productArr;
  }

  return {
    addProd: addItem,
    editProd: editItem,
    removeProd: removeItem,
    prodCatalog: returnArray,
    getProd: returnItem
  };
}

module.exports = productDB;