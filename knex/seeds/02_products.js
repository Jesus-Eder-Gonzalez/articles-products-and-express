
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          name: 'Slinky',
          price: 100.00,
          inventory: 10
        },
        {
          name: 'Gak',
          price: 5.99,
          inventory: 100
        }
      ]);
    });
};
