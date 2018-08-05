"use strict";

const renderParams = function(dbResults, type) {
  switch (type) {
    case "all":
      return {
        currentDBName: "Article Repository",
        articles: dbResults
      };
    default:
      return {
        currentDBName: "Article Repository",
        ...dbResults
      };
  }
};

const renderParamsP = function(dbResults, errRender, type) {
  switch (type) {
    case "all":
      return {
        currentDBName: "Product Catalog",
        products: dbResults,
        reasons: errRender
      };
    default:
      return {
        currentDBName: "Product Catalog",
        reasons: errRender,
        ...dbResults
      };
  }
};

module.exports = {
  renderParams,
  renderParamsP
};
