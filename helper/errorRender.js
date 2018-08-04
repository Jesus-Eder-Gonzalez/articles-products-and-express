'use strict';


const errorRender = function (res, app) {
  let temp;
  
  // res.locals.errors = [];
  // res.locals.errors .push({reason: 'eat Fries'});
  console.log(res.locals);
  console.log(app.loals);

  if(res.locals.errors){
    temp = res.locals.errors;
    res.locals.errors = '';
    return temp;
  }
  if(app.locals.errors){
    temp = app.locals.errors;
    app.locals.errors = '';
    return temp;
  }
  return false;
}

module.exports = errorRender;