
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', table => {
    table.increments('id');
    table.string('name').notNull();
    table.decimal('price',8,2).notNull();
    table.integer('inventory').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');

};
