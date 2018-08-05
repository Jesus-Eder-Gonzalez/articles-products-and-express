'use strict';

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

module.exports = {renderParams};