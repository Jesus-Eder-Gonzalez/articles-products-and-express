"use strict";

const db = require("./knex");

function articleDB() {
  function editArticle(urlTitle, artObj) {
    return db("articles")
      .update(artObj)
      .where({ url_title: urlTitle })
      .returning("*")
      .then(result => {
        if (!result) {
          throw new Error(`Article does not exist `);
        }
        return true;
      });
  }

  function getArticle(urlTitle) {
    return db
      .select()
      .from("articles")
      .where({ url_title: urlTitle })
      .then(result => {
        if (!result.length) {
          throw new Error(`Article does not exist `);
        }
        return result[0];
      });
  }

  function addArticle(urlTitle, artObj) {
    let temp = {
      title: artObj.title,
      body: artObj.body,
      author: artObj.author,
      url_title: urlTitle
    };

    return db("articles")
      .select()
      .where({ url_title: urlTitle })
      .then(result => {
        if (result.length) {
          throw new Error(`Article already exists!`);
        }
      })
      .then(() => {
        return db("articles")
          .insert(temp)
          .returning("*")
          .then(result => {
            if (!result) {
              throw new Error(
                "There was an error adding the article to the database"
              );
            }
            return true;
          });
      });
  }

  function getArticles() {
    return db
      .select()
      .from("articles")
      .then(articles => {
        return articles;
      });
  }

  function removeArticle(urlTitle) {
    return db("articles")
      .select()
      .where({ url_title: urlTitle })
      .then(result => {
        if (!result.length) {
          throw new Error(`Article does not exist`);
        }
        return result[0];
      })
      .then(article => {
        return db("articles")
          .where(article)
          .del()
          .then(result => {
            if (!result) {
              throw new Error("Delete has failed");
            }
            return true;
          });
      });
  }

  return {
    getArticle,
    getArticles,
    editArticle,
    addArticle,
    removeArticle
  };
}

module.exports = articleDB;
