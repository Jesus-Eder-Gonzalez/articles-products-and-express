'use strict';

const productFields = { POST: ['name', 'price', 'inventory'] };
const typeObj = { name: 'name', price: 'float', inventory: 'integer' };
let header = [];

const validation = function (req, res, next) {
  header = [`VALIDATION ${req.method} ${req.path}`];
  switch (req.method) {
    case 'POST':
      if (req.path === '/articles') {
        log('POST to ARTICLES');
        log(req.body);
        log(res.body);
      } else if (req.path === '/products') {
        let userInput = emptyCheck(productFields.POST, req.body);
        if (userInput.isEmpty) {
          res.render('./products/new', Object.assign({ reason: `The ${userInput.notFilled.join(', ')} fields were not filled out.` }, req.body));
          return;
        }
        userInput = productTypeCheck(productFields.POST, req.body);
        console.log(userInput.length);
        if(userInput.length>0){
          res.render('./products/new', Object.assign({typeReasons : userInput}, req.body));
          return;
        }
      }

  }
  return next();
}


const emptyCheck = function (fieldsToValidate, userInput) {

  let inputArr = fieldsToValidate
    .map(field => userInput[field] ? true : field)
    .filter(input => input !== true);

  let isEmpty = inputArr.length > 0 ? true : false;
  return {
    isEmpty: isEmpty,
    notFilled: inputArr
  };
}

const productTypeCheck = function (fields, userInput) {
  header.push(` TypeCheck `);

  let errors = fields.map(field => {
    return typeSwitch(userInput[field], field);
  });

  header.pop();
  return errors.filter(error => error !== true);

}

const typeSwitch = function (input, field) {
  header.push(`typeSwitch `)
  log(field);
  header.pop();
  let temp;
  switch (typeObj[field]) {
    case 'float':
      temp = Number(input);
      log(temp === NaN);
      if (!temp) {
        return { typeReason: `${field} needs to be a number.` };
      }
      return true;
    case 'integer':
      temp = Number(input);
      if (!temp) {
        return { typeReason: `${field} needs to be a number.` };
      }

      if (temp !== Math.floor(temp)) {
        return { typeReason: `${field} requires a whole number.` };
      }
      return true;
    case 'name':
      temp = input.replace(/\W+/g,'').replace(/[0-9]/g,'');
      if(input !== temp){
        return { typeReason: `${field} only accepts letters.` };
      }
      temp = input.match(/[0-9]/g);
      if(input.length > 50){
        return { typeReason: `${field} is limited to 50 characters.` };
      }
      return true;
    default:
      return true;
  }
}

const log = function (str) {
  process.stdout.write(`${header.join('')}: ${JSON.stringify(str)}\n`);
}

module.exports = validation;