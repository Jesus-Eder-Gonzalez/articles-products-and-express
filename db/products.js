'use strict';

function productDB() {
  const _productArr = [{
    id: 3290,
    name: 'Slinky',
    price: 100.00,
    inventory: 10
  }, {
    id: 4021,
    name: 'Gak',
    price: 5.99,
    inventory: 100
  }];
  // const _productArr = [];
  const idToArrInx = {
    3290: 0,
    4021: 1
  };
  const nameToArrInx = {
    'slinky': 0,
    'gak': 1
  };

  function addItem(itemObj) {
    let retObj;
    if (!nameToArrInx[itemObj.name]) {
      if (itemObj.id &&
        itemObj.name &&
        itemObj.price &&
        itemObj.inventory) {
        nameToArrInx[itemObj.name] = _productArr.length;
        idToArrInx[itemObj.id] = _productArr.length;
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
          reason: 'No product fields were provided. Change to name, price, or inventory.',
          id: uid
        };
      }
    } else {
      retObj = {
        success: false,
        reason: 'Item does not exist, try a POST request to create the item.',
        id: uid
      };
    }
    return retObj;
  }

  function removeItem(uid) {
    let retObj;

    if (_productArr[idToArrInx[uid]]) {
      _productArr[idToArrInx[uid]] = '';
      retObj = { success: true, uid: uid };
    } else {
      retObj = {
        success: false,
        reason: 'Item does not exist, try a POST request to create the item.',
        id: uid
      };
    }

    return retObj;
  }

  function returnItem(uid) {
    return _productArr[idToArrInx[uid]];
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