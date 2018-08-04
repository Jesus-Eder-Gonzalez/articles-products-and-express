
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {
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
          url_title: 'Cupcake'
        },
        {
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
          url_title: 'Sorry%20About%20The%20Cupcakes'
        }
      ]);
    });
};
