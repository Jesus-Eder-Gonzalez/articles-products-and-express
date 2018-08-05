"use strict";

const errorRender = function(res, app) {
  let temp;

  if (res.locals.errors) {
    temp = res.locals.errors;
    res.locals.errors = "";
    return temp;
  }
  if (app.locals.errors) {
    temp = app.locals.errors;
    app.locals.errors = "";
    return temp;
  }
};

module.exports = errorRender;
