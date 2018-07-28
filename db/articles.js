'use strict';

function articleDB() {
  const _articleArr = [{
    title: 'Cupcake',
    body: 'Pudding pastry jelly. Donut cake caramels sugar plum chocolate bar tart gummies.' +
      ' Cupcake cake macaroon tart macaroon gingerbread jelly beans. Marzipan chocolate ' +
      'gingerbread cheesecake dragée oat cake sugar plum sugar plum jujubes. Pie cupcake ' +
      'sugar plum gummies cotton candy lemon drops muffin gummi bears cotton candy. Lemon' +
      ' drops cheesecake jelly. Sweet biscuit toffee jelly beans bear claw wafer chocolate ' +
      'cake. Cake sugar plum bonbon. Macaroon chocolate cake candy canes oat cake danish ' +
      'gummies. Chocolate bar gingerbread biscuit halvah oat cake icing. Sweet halvah ' +
      'jelly soufflé cupcake. Gummi bears soufflé liquorice powder bear claw jelly beans ' +
      'sesame snaps.',
    author: 'Venelope',
    urlTitle: 'Cupcake'
  }, {
    title: 'Sorry About The Cupcakes',
    body:
      'Biscuit icing macaroon bonbon biscuit cupcake jelly. Brownie croissant carrot cake soufflé' +
      ' pastry chocolate bar cake dessert. Cupcake chocolate cheesecake. Lollipop croissant jelly-o' +
      ' cupcake apple pie pudding wafer biscuit. Tart icing halvah cheesecake cotton candy. Chocolate' +
      ' cake powder oat cake powder dragée cookie dessert icing jelly. Wafer tootsie roll apple pie ' +
      'dessert tiramisu. Tootsie roll powder gummi bears pastry pie tart tootsie roll biscuit cake. ' +
      'Toffee croissant pie muffin halvah toffee. Dragée sweet ice cream chocolate marzipan bonbon ' +
      'apple pie brownie. Macaroon chocolate bonbon croissant sugar plum chocolate marshmallow ' +
      'marshmallow. Tart liquorice pastry cotton candy danish icing tootsie roll cotton candy. ' +
      'Jelly beans cheesecake marshmallow macaroon chocolate bar. Pudding pie cake donut marshmallow ' +
      'powder cake halvah marshmallow.',
    author: 'Peter Liar',
    urlTitle: 'Sorry%20About%20The%20Cupcakes'
  }];
  // const _articleArr = [];
  const urlTitleToArrInx = { 'Cupcake': 0, 'Sorry%20About%20The%20Cupcakes': 1 };

  function editArticle(urlTitle, artObj) {

    let success;
    success = getArticle(urlTitle);
    if (!success) {
      return success;
    }

    let keys = Object.keys(artObj);
    keys.forEach(key => {
      success[key] = artObj[key];
    });

    return true;
  }

  function getArticle(urlTitle) {
    let success;
    console.log('ArrInx', urlTitleToArrInx[urlTitle], 'urlTitle', urlTitle);
    if (urlTitleToArrInx[urlTitle] !== undefined) {
      success = _articleArr[urlTitleToArrInx[urlTitle]];
    } else {
      success = false;
    }
    return success;
  }

  function addArticle(urlTitle, artObj) {

    let success;
    success = getArticle(artObj.title);
    console.log('add ', success);
    if (success) {
      return false;
    }

    let temp = {
      title: artObj.title,
      body: artObj.body,
      author: artObj.author,
      urlTitle: urlTitle
    };

    urlTitleToArrInx[urlTitle] = _articleArr.length;
    console.log('hashmap: ', urlTitleToArrInx);
    _articleArr.push(temp);
    console.log(_articleArr);

    return true;
  }

  function getArticles() {
    return _articleArr;
  }

  function removeArticle(urlTitle) {
    let success;
    success = getArticle(urlTitle);
    if (!success) {
      return success;
    }

    _articleArr.splice(urlTitleToArrInx[urlTitle], 1);

    return true;
  }

  return {
    getArticle,
    getArticles,
    editArticle,
    addArticle,
    removeArticle
  }
}

module.exports = articleDB;